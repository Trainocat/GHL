// =====================================
// GHL CORE
// =====================================

let leagueData = null;

async function loadLeague() {

    if (leagueData) {
        return leagueData;
    }

    const response = await fetch("league.json");

    leagueData = await response.json();

    return leagueData;

}

// =====================================
// TEAM HELPERS
// =====================================

function getTeamName(team) {

    return `${team.region} ${team.name}`;

}

function getTeamLogo(team) {

    if (team.imgURL) {
        return team.imgURL;
    }

    if (team.imgURLSmall) {
        return team.imgURLSmall;
    }

    return "GHL.png";

}

function latestSeason(team) {

    if (!team.seasons || team.seasons.length === 0) {
        return {};
    }

    return team.seasons[
        team.seasons.length - 1
    ];

}

function getTeamRecord(team) {

    const s = latestSeason(team);

    return `${s.won || 0}-${s.lost || 0}-${s.otl || 0}`;

}

function getGoalDiff(team) {

    const s = latestSeason(team);

    return (s.gf || 0) - (s.ga || 0);

}

// =====================================
// PLAYER HELPERS
// =====================================

function latestRating(player) {

    if (!player.ratings || player.ratings.length === 0) {
        return {};
    }

    return player.ratings[
        player.ratings.length - 1
    ];

}

function latestStats(player) {

    if (!player.stats || player.stats.length === 0) {
        return {};
    }

    return player.stats[
        player.stats.length - 1
    ];

}

function getPlayerName(player) {

    return `${player.firstName} ${player.lastName}`;

}

function getPlayerPoints(stats) {

    return (
        (stats.evG || 0) +
        (stats.ppG || 0) +
        (stats.shG || 0) +
        (stats.evA || 0) +
        (stats.ppA || 0) +
        (stats.shA || 0)
    );

}

function getPlayerGoals(stats) {

    return (
        (stats.evG || 0) +
        (stats.ppG || 0) +
        (stats.shG || 0)
    );

}

function getPlayerAssists(stats) {

    return (
        (stats.evA || 0) +
        (stats.ppA || 0) +
        (stats.shA || 0)
    );

}

// =====================================
// TABLE SORTING
// =====================================

function makeSortable(tableId) {

    const table = document.getElementById(tableId);

    if (!table) return;

    const headers = table.querySelectorAll("th");

    headers.forEach((header, index) => {

        header.addEventListener("click", () => {

            const tbody = table.querySelector("tbody");

            const rows = [
                ...tbody.querySelectorAll("tr")
            ];

            const asc =
                !header.classList.contains("asc");

            headers.forEach(h => {

                h.classList.remove("asc");
                h.classList.remove("desc");

            });

            header.classList.add(
                asc ? "asc" : "desc"
            );

            rows.sort((a, b) => {

                const aText =
                    a.children[index]
                    .innerText
                    .trim();

                const bText =
                    b.children[index]
                    .innerText
                    .trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);

                if (
                    !isNaN(aNum) &&
                    !isNaN(bNum)
                ) {

                    return asc
                        ? aNum - bNum
                        : bNum - aNum;

                }

                return asc
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);

            });

            tbody.innerHTML = "";

            rows.forEach(row => {

                tbody.appendChild(row);

            });

        });

    });

}