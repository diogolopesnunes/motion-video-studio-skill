import path from 'node:path';
import fs from 'node:fs/promises';
import {run,args,number,ROOT,main} from './common.mjs';

// Pipeline orquestrador: não substitui aprovação editorial nem revisão por visão.
main(async()=>{
  const a=args();
  const projectRoot=await fs.realpath(path.resolve(a['project-root']||ROOT));
  const page=a.page||'assets/starter/index.html';
  const duration=number(a.duration,24,.1,600,'duration');
  const format=a.format||'9:16', quality=a.quality||'preview';
  const out=path.resolve(projectRoot,a.out||'out/final.mp4');
  const review=path.resolve(projectRoot,a['review-out']||'out/review');
  const node=(script,argv)=>run(process.execPath,[path.join(ROOT,'scripts',script),...argv],{cwd:ROOT});
  const common=['--project-root',projectRoot,'--page',page,'--duration',String(duration),'--format',format,'--quality',quality];
  const folder=path.dirname(page);

  console.log('Lint...');
  node('lint.mjs',['--project-root',projectRoot,'--input',folder]);
  console.log('Render...');
  node('render.mjs',[...common,'--out',out,...(a.audio?['--audio',a.audio]:[])]);
  console.log('QA...');
  node('qa.mjs',['--input',out,'--duration',String(duration),'--auto-visual',...(a.audio?['--require-audio']:[]),'--out',path.resolve(projectRoot,'out/qa.json')]);
  console.log('Contact sheets...');
  node('review.mjs',['--input',out,'--out',review]);
  console.log(`Pronto para revisão humana: ${out} | ${review} | ${path.join(projectRoot,'out/qa.json')}`);
});
