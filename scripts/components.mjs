// Primitivos Canvas 2D determinísticos: resultado depende apenas do tempo t e parâmetros.
import {clamp,smooth,progress,lerp} from './motion.mjs';

export function kineticTitle(ctx,{value,x,y,size=72,color='#111',start=0,duration=.45,t,align='center',font='system-ui'}) {
  const p=smooth(progress(t,start,duration));if(p<=0)return;
  ctx.save();
  ctx.globalAlpha=p;
  ctx.translate(x,y+(1-p)*size*.65);
  ctx.font=`700 ${size}px ${font}`;
  ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle=color;
  ctx.fillText(value,0,0);
  ctx.restore();
}
export function counter(ctx,{from=0,to=100,x,y,t,start=0,duration=1,decimals=0,format=(n)=>n.toFixed(decimals),font='700 64px system-ui',color='#111'}) {
  const n=lerp(from,to,smooth(progress(t,start,duration)));
  ctx.save();ctx.fillStyle=color;ctx.font=font;ctx.fillText(format(n),x,y);ctx.restore();
  return n;
}
export function progressBar(ctx,{x,y,width,height,value,t,start=0,duration=.4,background='#ddd',foreground='#16966c'}) {
  const p=clamp(value,0,1)*smooth(progress(t,start,duration));
  ctx.save();ctx.fillStyle=background;ctx.fillRect(x,y,width,height);
  ctx.fillStyle=foreground;ctx.fillRect(x,y,width*p,height);ctx.restore();
}
export function fadeBetween(t,start,duration) {return smooth(progress(t,start,duration));}
