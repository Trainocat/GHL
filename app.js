
let leagueCache = null;

async function loadLeague(){
    if(leagueCache) return leagueCache;
    const res = await fetch('league.json');
    leagueCache = await res.json();
    return leagueCache;
}

function latestSeason(team){
    return team.seasons?.[team.seasons.length-1] || {};
}

function latestStats(player){
    return player.stats?.[player.stats.length-1] || {};
}

function latestRating(player){
    return player.ratings?.[player.ratings.length-1] || {};
}

function getTeamName(team){
    return `${team.region} ${team.name}`;
}

function getTeamLogo(team){
    return team.imgURL || team.imgURLSmall || 'GHL.png';
}

function buildTeamMap(data){
    const map = {};
    data.teams.forEach(t=>map[t.tid]=t);
    return map;
}

function sortTable(tableId, col){
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = [...tbody.querySelectorAll('tr')];
    const asc = table.dataset.sort !== 'asc';

    rows.sort((a,b)=>{
        const av = a.children[col].innerText.trim();
        const bv = b.children[col].innerText.trim();
        const an = parseFloat(av);
        const bn = parseFloat(bv);

        if(!isNaN(an) && !isNaN(bn)){
            return asc ? an - bn : bn - an;
        }

        return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    });

    tbody.innerHTML = '';
    rows.forEach(r=>tbody.appendChild(r));
    table.dataset.sort = asc ? 'asc' : 'desc';
}
