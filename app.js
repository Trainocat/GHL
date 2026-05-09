
let cache=null;

async function loadLeague(){
 if(cache) return cache;
 const r=await fetch('league.json');
 cache=await r.json();
 return cache;
}

function latestSeason(team){
 return team.seasons?.[team.seasons.length-1]||{};
}

function latestStats(player){
 return player.stats?.[player.stats.length-1]||{};
}

function latestRating(player){
 return player.ratings?.[player.ratings.length-1]||{};
}

function getTeamLogo(team){
 return team.imgURL || team.imgURLSmall || 'GHL.png';
}

function getTeamName(team){
 return `${team.region} ${team.name}`;
}

function sortTable(id,col){
 const table=document.getElementById(id);
 const rows=[...table.querySelectorAll('tbody tr')];
 const asc=!table.dataset.asc || table.dataset.asc==='false';
 rows.sort((a,b)=>{
   const av=a.children[col].innerText.trim();
   const bv=b.children[col].innerText.trim();
   const an=parseFloat(av), bn=parseFloat(bv);
   if(!isNaN(an)&&!isNaN(bn)) return asc?an-bn:bn-an;
   return asc?av.localeCompare(bv):bv.localeCompare(av);
 });
 table.dataset.asc=asc;
 rows.forEach(r=>table.querySelector('tbody').appendChild(r));
}
