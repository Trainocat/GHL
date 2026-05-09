// =====================================
    ] || {};

}

function latestRating(player) {

    return player.ratings?.[
        player.ratings.length - 1
    ] || {};

}

function getTeamName(team) {

    return `${team.region} ${team.name}`;

}

function getTeamLogo(team) {

    if (team.imgURL && team.imgURL !== "") {
        return team.imgURL;
    }

    if (team.imgURLSmall && team.imgURLSmall !== "") {
        return team.imgURLSmall;
    }

    return "GHL.png";

}

function goalDiff(team) {

    const s = latestSeason(team);

    return (s.gf || 0) - (s.ga || 0);

}

function buildTeamMap(data) {

    const map = {};

    data.teams.forEach(team => {

        map[team.tid] = team;

    });

    return map;

}

// =====================================
// SORTABLE TABLES
// =====================================

function makeSortable(tableId) {

    const table = document.getElementById(tableId);

    const headers = table.querySelectorAll("th");

    headers.forEach((header, index) => {

        header.addEventListener("click", () => {

            const tbody = table.querySelector("tbody");

            const rows = [
                ...tbody.querySelectorAll("tr")
            ];

            const ascending =
                !header.classList.contains("asc");

            headers.forEach(h => {

                h.classList.remove("asc");
                h.classList.remove("desc");

            });

            header.classList.add(
                ascending ? "asc" : "desc"
}