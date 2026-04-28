const words = ["BARREIRA", "REPELENTE", "PREDADOR", "RESIDENCIA", "MONITORAR", "NUTRICAO", "DIVERSIDADE"];
let gData = Array(12).fill().map(() => Array(12).fill(''));

const puts = [
    {w:"MONITORAR",r:0,c:0,d:"H"},
    {w:"DIVERSIDADE",r:1,c:0,d:"V"}, 
    {w:"PREDADOR",r:2,c:3,d:"H"},
    {w:"REPELENTE",r:6,c:2,d:"H"},
    {w:"RESIDENCIA",r:8,c:1,d:"H"},
    {w:"BARREIRA",r:10,c:4,d:"H"},
    {w:"OACIRTUN",r:11,c:2,d:"H"} 
];

puts.forEach(p=>{ for(let i=0;i<p.w.length;i++) { 
    let rr=p.r+(p.d=="V"?i:0), cc=p.c+(p.d=="H"?i:0);
    if(rr<12&&cc<12) gData[rr][cc]=p.w[i];
}});

const gEl = document.getElementById('g');
gData.forEach((row,r)=>row.forEach((char,c)=>{
    const div = document.createElement('div'); div.className='c';
    div.textContent = char || String.fromCharCode(65+Math.floor(Math.random()*26));
    div.onpointerdown=(e)=>{isS=true;e.target.releasePointerCapture(e.pointerId);sel(div)};
    div.onpointerenter=()=>{if(isS)sel(div)}; gEl.appendChild(div);
}));

let isS=false, sCells=[], found=0, sec=0;
const tInt = setInterval(()=>{sec++;document.getElementById('timer').textContent=`Tempo: ${sec}s`},1000);

words.forEach(w=>{
    const d=document.createElement('div'); d.id='w-'+w; d.className='item';
    d.textContent="• "+w; document.getElementById('l').appendChild(d);
});

function sel(el){ if(!sCells.includes(el)){ el.classList.add('sel'); sCells.push(el); } }

window.onpointerup=()=>{
    isS=false;
    const str = sCells.map(e=>e.textContent).join('');
    const rev = str.split('').reverse().join('');
    const f = words.find(w=>(w==str||w==rev) && !document.getElementById('w-'+w).classList.contains('ok'));
    
    if(f){
        sCells.forEach(e=>e.classList.add('ok'));
        document.getElementById('w-'+f).classList.add('ok');
        found++;
        if(found === words.length){
            clearInterval(tInt);
            document.getElementById('res').textContent = `Concluído em ${sec}s!`;
            document.getElementById('win').style.display='flex';
        }
    }
    sCells.forEach(e=>e.classList.remove('sel'));
    sCells=[];
};
