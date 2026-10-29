(()=>{"use strict";
const intro=document.querySelector('#siteIntro'),enter=document.querySelector('#enterSite');
if(!intro||!enter)return;
document.body.classList.add('intro-locked');
const canvas=document.createElement('canvas');canvas.className='intro-visual';canvas.setAttribute('aria-hidden','true');intro.prepend(canvas);
const ctx=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion: reduce)');
let width=0,height=0,frame=0,leaving=false,start=performance.now(),pointer={x:0,y:0},drift={x:0,y:0};
const particles=Array.from({length:42},(_,i)=>({x:((i*73)%101)/101,y:((i*47)%97)/97,s:.5+(i%3)*.45}));
function draw(now){
 if(!ctx)return;
 const t=motion.matches?0:(now-start)/1000;
 drift.x+=(pointer.x-drift.x)*.035;drift.y+=(pointer.y-drift.y)*.035;
 ctx.clearRect(0,0,width,height);
 const cx=width*(.5+drift.x*.045),cy=height*(.46+drift.y*.035);
 const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(width,height)*.6);
 glow.addColorStop(0,'rgba(93,19,31,.24)');glow.addColorStop(.45,'rgba(47,14,24,.1)');glow.addColorStop(1,'rgba(0,0,0,0)');
 ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
 ctx.save();ctx.globalCompositeOperation='screen';
 for(let i=0;i<6;i++){
  const origin=width*(i%2?.88:.12),angle=Math.sin(t*.19+i*1.7)*width*.22;
  const end=width*.5+angle+drift.x*width*.12;
  const beam=ctx.createLinearGradient(origin,-height*.1,end,height);
  beam.addColorStop(0,'rgba(255,255,255,.09)');beam.addColorStop(.55,'rgba(167,131,137,.025)');beam.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(origin,-height*.1);ctx.lineTo(end-width*.1,height);ctx.lineTo(end+width*.1,height);ctx.closePath();ctx.fill();
 }
 ctx.translate(cx,height*.76);ctx.scale(1,.28);
 for(let i=0;i<5;i++){
  const phase=(t*.065+i/5)%1,r=width*(.12+phase*.72);
  ctx.beginPath();ctx.ellipse(0,0,r,r,0,0,Math.PI*2);ctx.strokeStyle=`rgba(214,199,201,${.11*(1-phase)})`;ctx.lineWidth=1;ctx.stroke();
 }
 ctx.restore();
 for(const p of particles){const y=((p.y-t*.012)%1+1)%1;ctx.fillStyle=`rgba(255,255,255,${.1+.16*Math.sin(t*.6+p.x*20)**2})`;ctx.beginPath();ctx.arc(p.x*width+drift.x*12,y*height,p.s,0,Math.PI*2);ctx.fill();}
 if(!motion.matches&&!document.hidden&&!leaving)frame=requestAnimationFrame(draw);
}
function resize(){width=intro.clientWidth;height=intro.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);cancelAnimationFrame(frame);draw(performance.now());}
function visibility(){cancelAnimationFrame(frame);if(!document.hidden&&!leaving)draw(performance.now());}
function changeMotion(){cancelAnimationFrame(frame);draw(performance.now());}
function move(e){pointer.x=(e.clientX/width-.5)*2;pointer.y=(e.clientY/height-.5)*2;}
function reset(){pointer.x=0;pointer.y=0;}
function leave(){
 if(leaving)return;leaving=true;cancelAnimationFrame(frame);intro.classList.add('is-leaving');document.body.classList.remove('intro-locked');
 window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',changeMotion);
 intro.removeEventListener('pointermove',move);intro.removeEventListener('pointerleave',reset);
 document.querySelector('#main')?.focus({preventScroll:true});setTimeout(()=>intro.remove(),950);
}
enter.addEventListener('click',leave);
intro.addEventListener('pointermove',move,{passive:true});intro.addEventListener('pointerleave',reset);
window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',changeMotion);resize();
})();
