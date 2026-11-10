import fs from 'node:fs/promises';
import path from 'node:path';
import {args,ROOT,main} from './common.mjs';
// Cap. 04/12: uma pasta/sessão por marca ou filme, com docs e gates prontos.
const TEMPLATES={
  'docs/brief.md':'brief-template.md',
  'docs/style_guide.md':'templates/style_guide.md',
  'docs/shotlist.md':'templates/shotlist.md',
  'docs/shotlist.json':'templates/shotlist.example.json',
  'docs/review_log.md':'templates/review_log.md',
  'docs/spec.md':'templates/morph-spec.md'
};
main(async()=>{
  const a=args();if(!a.dir)throw new Error('--dir PASTA obrigatório (ex.: ../meu-filme)');
  const dir=path.resolve(a.dir);
  for(const d of ['docs','refs','assets','audio','out'])await fs.mkdir(path.join(dir,d),{recursive:true});
  const made=[];
  for(const [dest,src] of Object.entries(TEMPLATES)){
    const to=path.join(dir,dest);
    try{await fs.copyFile(path.join(ROOT,'assets',src),to,fs.constants.COPYFILE_EXCL);made.push(dest);}catch(e){if(e.code!=='EEXIST')throw e;}
  }
  // Projeto independente e executável: copia a cena inicial e os helpers importados.
  const starter=path.join(ROOT,'assets/starter'), dest=path.join(dir,'assets/starter');
  await fs.mkdir(dest,{recursive:true});
  await fs.cp(starter,dest,{recursive:true,force:false,errorOnExist:false});
  await fs.mkdir(path.join(dir,'scripts'),{recursive:true});
  await fs.copyFile(path.join(ROOT,'scripts/motion.mjs'),path.join(dir,'scripts/motion.mjs'),fs.constants.COPYFILE_EXCL).catch(e=>{if(e.code!=='EEXIST')throw e;});
  await fs.writeFile(path.join(dir,'.gitignore'),'out/\n.env\n.env.*\n!.env.example\nnode_modules/\n',{flag:'wx'}).catch(e=>{if(e.code!=='EEXIST')throw e;});
  console.log(`Projeto em ${dir}. Criados: ${made.join(', ')||'(nada novo)'}.`);
  console.log(`Próximo: preencha docs/brief.md e rode npm run produce -- --project-root ${dir} --duration 24 --quality preview.`);
});
