
async function loadLeague(){
const r = await fetch('league.json');
return await r.json();
}

function latestSeason(team){
return team.seasons?.[team.seasons.length-1] || {};
}

function getTeam(data,tid){
return data.teams.find(t=>t.tid==tid);
}

function getPlayer(data,pid){
return data.players.find(p=>p.pid==pid);
}

function makeSortable(table){

const headers = table.querySelectorAll("th");

headers.forEach((header,index)=>{

header.addEventListener("click",()=>{

const tbody = table.querySelector("tbody");
const rows = [...tbody.querySelectorAll("tr")];

const asc = !header.classList.contains("asc");

headers.forEach(h=>{
h.classList.remove("asc");
h.classList.remove("desc");
});

header.classList.add(asc ? "asc":"desc");

rows.sort((a,b)=>{

const at = a.children[index].innerText.trim();
const bt = b.children[index].innerText.trim();

const an = parseFloat(at);
const bn = parseFloat(bt);

if(!isNaN(an) && !isNaN(bn)){
return asc ? an-bn : bn-an;
}

return asc
? at.localeCompare(bt)
: bt.localeCompare(at);

});

tbody.innerHTML='';
rows.forEach(r=>tbody.appendChild(r));

});

});

}
