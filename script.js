const eventDate = new Date("2026-10-28T07:30:00+08:00");
const countdown = document.getElementById("countdown");
function tick(){
  const d = eventDate - new Date();
  if(d <= 0){ countdown.textContent = "THE CELEBRATION DAY IS HERE · 🤍"; return; }
  const days=Math.floor(d/86400000), hours=Math.floor(d%86400000/3600000), mins=Math.floor(d%3600000/60000), secs=Math.floor(d%60000/1000);
  countdown.textContent = `${days} DAYS · ${String(hours).padStart(2,"0")} HRS · ${String(mins).padStart(2,"0")} MIN · ${String(secs).padStart(2,"0")} SEC`;
}
tick(); setInterval(tick,1000);

// Godparent tabs
for(const btn of document.querySelectorAll(".gp-tabs button")){
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".gp-tabs button").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".gp-panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
}

// Scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Background music: Sunshine by Scandinavianz.
const bgMusic=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");
let playing=false;

async function toggleMusic(){
  if(!bgMusic) return;
  try{
    if(bgMusic.paused){
      await bgMusic.play();
      playing=true;
      musicBtn.textContent="Ⅱ";
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-label","Pause background music");
    }else{
      bgMusic.pause();
      playing=false;
      musicBtn.textContent="♪";
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("aria-label","Play background music");
    }
  }catch(err){
    console.warn("Music playback was blocked by the browser.",err);
  }
}

musicBtn.addEventListener("click",toggleMusic);
bgMusic.addEventListener("play",()=>{playing=true; musicBtn.textContent="Ⅱ"; musicBtn.classList.add("playing");});
bgMusic.addEventListener("pause",()=>{playing=false; musicBtn.textContent="♪"; musicBtn.classList.remove("playing");});
