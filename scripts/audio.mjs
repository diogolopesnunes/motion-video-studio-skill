import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {args,number,main} from './common.mjs';
import {seeded} from './motion.mjs';
export function synth({duration=24,bpm=120,rate=48000,seed=7}={}) {
  const samples=Math.ceil(duration*rate), data=Buffer.alloc(samples*2), random=seeded(seed);
  const bass=[55,55,65.406,73.416], step=60/bpm;
  for(let i=0;i<samples;i++) {
    const t=i/rate, beat=t/step, phase=t%step, bar=Math.floor(beat/4), half=t%(step/2);
    const kick=Math.sin(2*Math.PI*(48*phase+7*(1-Math.exp(-35*phase))))*Math.exp(-25*phase)*0.32;
    const hat=(random()*2-1)*Math.exp(-160*half)*0.055;
    const note=bass[bar%4], low=Math.sin(2*Math.PI*note*t)*Math.exp(-3*phase)*0.11;
    const accent=Math.sin(2*Math.PI*880*t)*Math.exp(-55*phase)*(Math.floor(beat)%4===0 ? 0.05 : 0);
    const fade=Math.min(1,t/0.04,(duration-t)/0.25);
    const s=Math.max(-0.95,Math.min(0.95,(kick+hat+low+accent)*fade));
    data.writeInt16LE(Math.round(s*32767),i*2);
  }
  const header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+data.length,4);header.write('WAVEfmt ',8);
  header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);header.writeUInt32LE(rate,24);
  header.writeUInt32LE(rate*2,28);header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(data.length,40);
  return Buffer.concat([header,data]);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) main(async()=>{
  const a=args(), duration=number(a.duration,24,0.1,600,'duration'), bpm=number(a.bpm,120,30,240,'bpm');
  const out=path.resolve(a.out || 'out/score.wav'); await fs.mkdir(path.dirname(out),{recursive:true});
  await fs.writeFile(out,synth({duration,bpm}));console.log(out);
});
