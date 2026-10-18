'use strict';
/* Growth hooks: shareable comparison links + card, visible custom-report CTA. */
(function(){
Viral.init({slug:'costpertask',name:'CostPerTask',url:'https://mxhoaib.github.io/costpertask/',emoji:'💸',c1:'#30d158',c2:'#64d2ff'});
Viral.heroPay(document.querySelector('.hero'),{item:'report',cta:'📊 Custom cost report for your team',price:29});
const bar=Viral.payBar({item:'report',label:'Need exact numbers for your team?',cta:'Cost report',price:29});
const sec=document.createElement('section');sec.className='panel';$('#summary').after(sec);
const note=document.createElement('p');note.className='muted small';note.textContent='The card and link use the prices you typed in. They are not official quotes.';sec.appendChild(note);
function state(){return{k:+$('#task').value,i:+$('#inT').value||0,o:+$('#outT').value||0,n:+$('#runs').value||0,m:models.slice(0,8).map(m=>[String(m[0]).slice(0,40),+m[1]||0,+m[2]||0])}}
const panel=Viral.sharePanel(sec,()=>{const s=[...res].sort((a,b)=>a.mo-b.mo),n=+$('#runs').value||0,task=TASKS[$('#task').value][0];if(!s.length)return{big:'?'};
 return{kicker:`${task} × ${n.toLocaleString('en')}/month`,big:fmt(s[0].mo)+'/mo',line:`Cheapest with my prices: ${s[0].name}`,sub:s.length>1?`Most expensive: ${s.at(-1).name} at ${fmt(s.at(-1).mo)}/mo`:'',cta:'What does your AI task cost?',
  text:`${task} × ${n.toLocaleString('en')}/month costs ${fmt(s[0].mo)} to ${fmt(s.at(-1).mo)} depending on the model (my prices). Check yours:`,url:Viral.challengeUrl(state())}},{title:'Share this comparison',copyLabel:'🔗 Copy comparison link',noName:true});
let t=null,touched=false;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(panel.update,120)}).observe($('#summary'),{childList:true,subtree:true,characterData:true});
document.querySelector('section.panel').addEventListener('input',()=>{if(!touched){touched=true;bar.show()}});
setTimeout(panel.update,0);
const ch=Viral.readChallenge();
if(ch&&Array.isArray(ch.m)&&ch.m.length&&ch.m.length<=8&&Number.isInteger(ch.k)&&ch.k>=0&&ch.k<TASKS.length){
 const num=v=>Math.max(0,Math.min(1e9,+v||0));
 Viral.banner(`💸 Someone shared an AI cost comparison for “${TASKS[ch.k][0]}” at ${num(ch.n).toLocaleString('en')} tasks/month. Load their numbers to see it (this replaces your saved prices).`,'Load their numbers',()=>{
  $('#task').value=ch.k;$('#inT').value=num(ch.i);$('#outT').value=num(ch.o);$('#runs').value=num(ch.n);
  models=ch.m.filter(Array.isArray).map(m=>[String(m[0]||'Model').slice(0,40),num(m[1]),num(m[2]),(EX.find(e=>e[0]===m[0])||[])[3]||'']);rows();document.querySelector('section.panel').scrollIntoView({behavior:'smooth'})},$('.hero'))}
})();
