import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from '../scripts/common.mjs';
import {checkUrl,isPrivateIP} from '../scripts/gather-assets.mjs';
import {parseVisualLog} from '../scripts/visual-check.mjs';

test('bloqueia IPv4/IPv6 privados e reservados',()=>{
  for(const ip of ['127.0.0.1','10.0.0.1','192.168.1.2','172.16.1.5','100.64.0.1','169.254.1.1','::1','fc00::1']) {
    assert.equal(isPrivateIP(ip),true,ip);
  }
  assert.equal(isPrivateIP('8.8.8.8'),false);
  assert.throws(()=>checkUrl('http://127.0.0.1/internal'));
});
test('parseia alertas objetivos de vídeo',()=>{
  const r=parseVisualLog('black_start:1 black_end:2 black_duration:1\nfreeze_start: 5.4');
  assert.equal(r.length,2);assert.equal(r[0].kind,'black');assert.equal(r[1].kind,'freeze');
});
test('projeto novo traz starter e helpers, sem sobrescrever arquivos',async()=>{
  const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'motion-upgrade-'));
  try {
    const runner=(argv)=>spawnSync(process.execPath,[path.join(ROOT,'scripts/new.mjs'),...argv],{encoding:'utf8'});
    assert.equal(runner(['--dir',tmp]).status,0);
    assert.ok((await fs.stat(path.join(tmp,'assets/starter/scene.mjs'))).isFile());
    assert.ok((await fs.stat(path.join(tmp,'scripts/motion.mjs'))).isFile());
    assert.equal(runner(['--dir',tmp]).status,0);
  } finally {await fs.rm(tmp,{recursive:true,force:true});}
});
