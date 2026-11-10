import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {args,main} from './common.mjs';

// Heurísticas objetivas: vídeos propositalmente escuros/parados podem gerar falsos positivos.
// Não detecta textos cortados, qualidade estética nem sincronismo da narrativa.
export function parseVisualLog(log) {
  const black=[...log.matchAll(/black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)/g)]
    .map(m=>({kind:'black',start:Number(m[1]),end:Number(m[2])}));
  const freeze=[...log.matchAll(/freeze_start: ([\d.]+)/g)]
    .map(m=>({kind:'freeze',start:Number(m[1])}));
  return [...black,...freeze].sort((a,b)=>a.start-b.start);
}
export function analyzeVisual(input) {
  const ff=process.env.FFMPEG||'ffmpeg';
  const r=spawnSync(ff,[
    '-hide_banner','-loglevel','info','-i',path.resolve(input),
    '-vf','blackdetect=d=0.5:pix_th=0.10,freezedetect=n=-50dB:d=2.5',
    '-an','-f','null','-'
  ],{encoding:'utf8',maxBuffer:16*1024*1024,windowsHide:true});
  if(r.error||r.status!==0)throw new Error(r.error?.message||r.stderr);
  return {
    method:'FFmpeg blackdetect/freezedetect',
    warnings:parseVisualLog(r.stderr),
    limitations:'Heurísticas: inspeção visual/auditiva continua necessária'
  };
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main(async()=>{
  const a=args();if(!a.input)throw new Error('--input VIDEO obrigatório');
  console.log(JSON.stringify(analyzeVisual(a.input),null,2));
});
