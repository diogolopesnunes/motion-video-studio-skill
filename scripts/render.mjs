import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {args, number, ROOT, main} from './common.mjs';
import {serve} from './server.mjs';
const formats = {'16:9':[1920,1080], '9:16':[1080,1920], '1:1':[1080,1080]};
main(async () => {
  const a = args(), format = a.format || '16:9';
  if (!formats[format]) throw new Error('Formato: 16:9, 9:16 ou 1:1');
  const scale = number(a.scale, 1, 0.1, 2, 'scale');
  const [width,height] = formats[format].map(n=>Math.round(n*scale/2)*2);
  const fps = number(a.fps, 60, 1, 60, 'fps');
  const sub = number(a.sub, 4, 1, 8, 'sub');
  if (!Number.isInteger(sub)) throw new Error('sub deve ser inteiro');
  if (!Number.isInteger(fps)) throw new Error('fps deve ser inteiro');
  const duration = number(a.duration, 24, 0.1, 600, 'duration');
  const start = number(a.start, 0, 0, 36000, 'start');
  const output = path.resolve(a.out || `out/${a.stills ? 'stills' : `demo-${format.replace(':','x')}.mp4`}`);
  const pagePath = a.page || 'assets/starter/index.html';
  const absolutePage = path.resolve(ROOT, pagePath), rel = path.relative(ROOT, absolutePage);
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('--page precisa estar dentro do pacote');
  await fs.access(absolutePage);
  const config = a.config ? JSON.parse(await fs.readFile(path.resolve(a.config),'utf8')) : {};
  const server = await serve(ROOT);
  let browser, encoder, encoderDone, encoderError = '', browserErrors = [];
  try {
    browser = await chromium.launch({headless:true});
    const page = await browser.newPage({viewport:{width,height}, deviceScaleFactor:1});
    page.on('pageerror', e=>browserErrors.push(e.message));
    page.on('response', r=>{if(r.status() >= 400) browserErrors.push(`HTTP ${r.status()} ${r.url()}`);});
    await page.route('**/*', route=>route.request().url().startsWith(server.url + '/') ? route.continue() : route.abort());
    await page.goto(`${server.url}/${rel.split(path.sep).map(encodeURIComponent).join('/')}`);
    await page.evaluate(async ({width,height,config})=>{
      await document.fonts.ready;
      if (window.ready) await window.ready;
      if(typeof window.seek !== 'function') throw new Error('Página deve expor window.seek(t)');
      await window.configure?.({...config,width,height});
    }, {width,height,config});
    if (a.stills) {
      await fs.mkdir(output,{recursive:true});
      const times = (a.times || '0.8,2,3.8,6.5,8.8,10.8,12.8,14.8,16.8,18.5,20.5,23').split(',').map(Number);
      if (times.some(t=>!Number.isFinite(t)||t<0||t>=duration)) throw new Error('Timestamps inválidos ou fora da duração');
      for(const t of times) {
        await page.evaluate(t=>window.seek(t),t);
        await page.screenshot({path:path.join(output,`${t.toFixed(3)}.png`),animations:'disabled'});
      }
      console.log(`Stills: ${output}`);
    } else {
      await fs.mkdir(path.dirname(output),{recursive:true});
      const ffargs = ['-hide_banner','-loglevel','error','-n','-f','image2pipe','-vcodec','png','-framerate',String(fps*sub),'-i','pipe:0'];
      if(a.audio) ffargs.push('-ss',String(start),'-i',path.resolve(a.audio),'-map','0:v:0','-map','1:a:0','-af','apad','-c:a','aac','-b:a','192k');
      if(sub>1) ffargs.push('-vf',`tmix=frames=${sub},select='eq(mod(n\\,${sub})\\,${sub-1})',setpts=N/${fps}/TB`);
      ffargs.push('-r',String(fps),'-c:v','libx264','-pix_fmt','yuv420p','-crf','16','-preset','medium','-t',String(duration),'-movflags','+faststart',output);
      encoder = spawn(process.env.FFMPEG || 'ffmpeg',ffargs,{stdio:['pipe','ignore','pipe'],windowsHide:true});
      encoder.stdin.on('error',()=>{});
      encoder.stderr.on('data',d=>{encoderError += d.toString();});
      encoderDone = new Promise((resolve,reject)=>{encoder.on('error',reject);encoder.on('close',c=>c===0 ? resolve() : reject(new Error(encoderError || `FFmpeg ${c}`)));});
      // Instalar handler já: uma falha precoce não deve virar rejection não tratada.
      encoderDone.catch(()=>{});
      const frames = Math.ceil(duration*fps)*sub;
      for(let i=0;i<frames;i++) {
        if(encoder.exitCode !== null || encoder.destroyed) throw new Error(encoderError || 'Encoder encerrado');
        await page.evaluate(t=>window.seek(t),start+i/(fps*sub));
        const png = await page.screenshot({type:'png',animations:'disabled'});
        if(!encoder.stdin.write(png)) await Promise.race([once(encoder.stdin,'drain'),encoderDone.then(()=>{throw new Error('Encoder encerrado antes dos frames');})]);
        if(i % (fps*sub*2)===0) console.log(`${i}/${frames} subframes`);
      }
      encoder.stdin.end();
      await encoderDone;
      console.log(`Render: ${output}`);
    }
    if(browserErrors.length) throw new Error(`Erros na composição: ${browserErrors.join('; ')}`);
  } finally {
    if(encoder && encoder.exitCode===null) encoder.kill();
    await browser?.close(); await server.close();
  }
});
