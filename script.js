const $=s=>document.querySelector(s);
const MESSAGE=`Hey! I know I’m a little late, but I didn’t want to miss the chance to wish you. I hope your birthday was filled with happiness, laughter, and beautiful memories. May this new chapter bring you lots of success, exciting adventures, and countless reasons to smile. Stay happy, keep shining, and never stop being amazing!

Once again, Happy Belated Birthday! 💗`;
/* ✏️ Edit captions here. Drop photos into /photos named photo1.jpg … photo6.jpg */
const PHOTOS=[["Memory #1","📸","#ff9ecb","#c9b6ff"],["Memory #2","🌸","#c9b6ff","#7b5cd6"],["Memory #3","✨","#ffd98a","#ff9ecb"],["Memory #4","🎀","#ff9ecb","#a98cf5"],["Memory #5","🌙","#7b5cd6","#ff9ecb"],["Memory #6","💗","#ffd98a","#c9b6ff"]];

/* ---------- background: stars, hearts, glow orbs ---------- */
const bg=$('#bg'),bx=bg.getContext('2d');let W,H,items=[];
const rnd=(a,b)=>a+Math.random()*(b-a);
function make(){const n=W<600?60:120;items=[];
 for(let i=0;i<n;i++){const r=Math.random();
  items.push(r<.62?{t:'s',x:rnd(0,W),y:rnd(0,H),s:rnd(.6,2),p:rnd(0,6.3),v:rnd(.01,.04)}
  :r<.82?{t:'h',x:rnd(0,W),y:rnd(0,H),s:rnd(10,20),v:rnd(.15,.5),p:rnd(0,6.3),c:Math.random()<.5?'#ff9ecb':'#c9b6ff'}
  :r<.93?{t:'o',x:rnd(0,W),y:rnd(0,H),s:rnd(30,90),v:rnd(.05,.2),p:rnd(0,6.3)}
  :{t:'g',x:rnd(0,W),y:rnd(0,H),s:rnd(3,6),v:rnd(.1,.3),p:rnd(0,6.3)});}}
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
 for(const c of [bg,fx]){c.width=W*d;c.height=H*d}bx.setTransform(d,0,0,d,0,0);fc.setTransform(d,0,0,d,0,0);make()}
function heart(c,x,y,s){c.beginPath();c.moveTo(x,y+s*.3);c.bezierCurveTo(x,y-s*.2,x-s,y-s*.2,x-s,y+s*.35);c.bezierCurveTo(x-s,y+s*.8,x,y+s*1.05,x,y+s*1.3);c.bezierCurveTo(x,y+s*1.05,x+s,y+s*.8,x+s,y+s*.35);c.bezierCurveTo(x+s,y-s*.2,x,y-s*.2,x,y+s*.3);c.fill()}
function drawBg(t){bx.clearRect(0,0,W,H);
 for(const i of items){i.p+=i.v;
  if(i.t==='s'){bx.globalAlpha=.35+.65*Math.abs(Math.sin(i.p*3));bx.fillStyle='#fff';bx.beginPath();bx.arc(i.x,i.y,i.s,0,6.3);bx.fill()}
  else if(i.t==='g'){i.y-=i.v;if(i.y<-10)i.y=H+10;bx.globalAlpha=.5+.5*Math.sin(i.p*4);bx.fillStyle='#ffd98a';bx.shadowColor='#ffd98a';bx.shadowBlur=12;bx.beginPath();bx.arc(i.x+Math.sin(i.p)*8,i.y,i.s/2,0,6.3);bx.fill();bx.shadowBlur=0}
  else if(i.t==='h'){i.y-=i.v;if(i.y<-30){i.y=H+30;i.x=rnd(0,W)}bx.globalAlpha=.22;bx.fillStyle=i.c;heart(bx,i.x+Math.sin(i.p)*14,i.y,i.s/2)}
  else{i.y-=i.v;if(i.y<-100)i.y=H+100;const g=bx.createRadialGradient(i.x,i.y,0,i.x,i.y,i.s);g.addColorStop(0,'rgba(201,182,255,.18)');g.addColorStop(1,'rgba(201,182,255,0)');bx.globalAlpha=1;bx.fillStyle=g;bx.beginPath();bx.arc(i.x,i.y,i.s,0,6.3);bx.fill()}}
 bx.globalAlpha=1}

/* ---------- confetti ---------- */
const fx=$('#fx'),fc=fx.getContext('2d');let P=[];
const COL=['#ff9ecb','#c9b6ff','#ffd98a','#fff','#a98cf5'];
function burst(x,y,n=90){for(let i=0;i<n;i++){const a=rnd(0,6.3),v=rnd(3,13),k=Math.random();
 P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-5,r:rnd(0,6.3),vr:rnd(-.3,.3),s:rnd(6,12),c:COL[i%5],life:rnd(90,170),k:k<.12?'💗':k<.2?'✨':k<.55?'r':'o'})}}
function drawFx(){fc.clearRect(0,0,W,H);
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.vy+=.22;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.life--;
  if(p.life<=0||p.y>H+30){P.splice(i,1);continue}
  fc.save();fc.translate(p.x,p.y);fc.rotate(p.r);fc.globalAlpha=Math.min(1,p.life/40);fc.fillStyle=p.c;
  if(p.k==='r')fc.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);else if(p.k==='o'){fc.beginPath();fc.arc(0,0,p.s/3,0,6.3);fc.fill()}
  else{fc.font=p.s*1.6+'px serif';fc.textAlign='center';fc.fillText(p.k,0,0)}
  fc.restore()}}
function loop(t){drawBg(t);drawFx();requestAnimationFrame(loop)}
addEventListener('resize',size);size();requestAnimationFrame(loop);
const at=el=>{const b=el.getBoundingClientRect();return[b.left+b.width/2,b.top+b.height/2]};

/* ---------- opening ---------- */
$('#open').onclick=e=>{
 burst(...at(e.currentTarget),120);$('#flash').classList.add('on');document.body.classList.add('opening');
 setTimeout(()=>{$('#flash').classList.remove('on')},350);
 setTimeout(()=>{document.body.classList.remove('locked');$('#intro').style.display='none';scrollTo({top:0,behavior:'instant'});
  burst(W*.15,H*.7,80);burst(W*.85,H*.7,80);watch()},800)};
/* balloons */
const bal=$('.balloons');['#ff9ecb','#c9b6ff','#ffd98a','#a98cf5','#ff86b8','#e3d6ff','#ffb3d6'].forEach((c,i)=>{const b=document.createElement('div');b.className='balloon';
 b.style.cssText=`--c:${c};--x:${6+i*14}%;--t:${9+i*1.3}s;--dl:-${i*1.7}s`;bal.appendChild(b)});

/* ---------- scroll reveals + section events ---------- */
let typed=false,fireTimer;
function typeIt(){if(typed)return;typed=true;const el=$('#typed');let i=0;const chars=[...MESSAGE];
 (function step(){if(skip)return;i++;el.innerHTML=chars.slice(0,i).join('').replace(/\n/g,'<br>');
  if(i<chars.length)setTimeout(step,/[.!,]/.test(chars[i-1])?260:32);else done()})()}
let skip=false;function done(){document.querySelector('.caret').style.display='none';$('#skip').style.display='none'}
$('#skip').onclick=()=>{skip=true;$('#typed').innerHTML=MESSAGE.replace(/\n/g,'<br>');done();burst(...at($('#skip')),50)};
function watch(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  e.target.classList.add('in');
  if(e.target.closest('#message'))setTimeout(typeIt,600);
  if(e.target.closest('#final')&&!fireTimer){let n=0;fireTimer=setInterval(()=>{burst(rnd(W*.15,W*.85),rnd(H*.15,H*.5),70);if(++n>6){clearInterval(fireTimer)}},650)}
 }),{threshold:.3});
 document.querySelectorAll('.rv').forEach(el=>io.observe(el))}

/* ---------- gift ---------- */
$('#gift').onclick=e=>{const g=e.currentTarget;if(g.classList.contains('open'))return;
 g.classList.add('open');$('#prize').classList.add('on');$('#giftTxt').textContent='Surprise!! 🎉';burst(...at(g),110)};
/* ---------- cake ---------- */
$('#cake').onclick=e=>{const b=e.currentTarget,out=b.classList.toggle('out');
 $('#cakeTxt').textContent=out?'Wish made? Good. It’s valid even when you’re late 😌 (tap to relight)':'Tap the cake to blow the candles 🌬️';
 if(out)burst(...at(b),100)};
/* ---------- gallery ---------- */
$('#strip').innerHTML=PHOTOS.map((p,i)=>`<figure class="pol" style="--r:${[-4,3,-2,4,-3,2][i]}deg"><div class="ph" style="--a:${p[2]};--b:${p[3]}"><span>${p[1]}</span><img src="photos/photo${i+1}.jpg" alt="${p[0]}" hidden></div><p>${p[0]}</p></figure>`).join('');
document.querySelectorAll('.ph img').forEach(im=>{im.onload=()=>{im.hidden=false;im.previousElementSibling.hidden=true};im.onerror=()=>im.remove()});
/* ---------- replay ---------- */
$('#replay').onclick=()=>{scrollTo({top:0,behavior:'smooth'});burst(...at($('#replay')),100)};

/* ---------- music box (synthesised, no files) ---------- */
let ac,gain,nextT=0,timer,playing=false;
const N={G2:98,F2:87.3,C3:130.8,G4:392,A4:440,B4:493.9,C5:523.3,D5:587.3,E5:659.3,F5:698.5,G5:784};
const SONG=[['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',2]];
const BASS=[[0,'C3'],[6,'G2'],[12,'C3'],[19,'F2'],[22,'C3']],BEAT=.56;
function tone(f,t,d,v){const o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain();
 o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0005,t+d*1.7);
 o.connect(g);o2.connect(g);g.connect(gain);o.start(t);o2.start(t);o.stop(t+d*1.8);o2.stop(t+d*1.8)}
function sched(t){let b=0;for(const[n,d]of SONG){tone(N[n],t+b*BEAT,d*BEAT,.5);b+=d}
 for(const[bt,n]of BASS)tone(N[n],t+bt*BEAT,BEAT*3,.55);return t+(b+3)*BEAT}
function toggleMusic(){const btn=$('#music');
 if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();gain=ac.createGain();gain.gain.value=.22;gain.connect(ac.destination);nextT=ac.currentTime+.1;
  timer=setInterval(()=>{if(ac.currentTime>nextT-2)nextT=sched(nextT)},400);nextT=sched(nextT)}
 if(playing){ac.suspend();playing=false}else{ac.resume();playing=true}
 btn.classList.toggle('playing',playing);btn.textContent=playing?'🎶':'🎵';btn.setAttribute('aria-label',playing?'Pause music':'Play music')}
$('#music').onclick=toggleMusic;
