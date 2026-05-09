
async function loadLeague() {

    const response =
        await fetch("league.json");

    return await response.json();

}

function currentSeason(data) {

    return data.gameAttributes.season;

}

function currentSeasonTeam(team, data) {

    return team.seasons?.find(season => {

        return (
            season.season ===
            currentSeason(data)
        );

    }) || team.seasons?.[
        team.seasons.length - 1
    ] || {};

}

function currentSeasonStats(player, data) {

    const season =
        currentSeason(data);

    const stats =
        player.stats?.filter(stat => {

            return (
                stat.season === season &&
                !stat.playoffs
            );

        }) || [];

    if (stats.length > 1) {

        return stats.find(stat => {

            return stat.tid === player.tid;

        }) || stats[0];

    }

    return stats[0] || {};

}

function latestRating(player) {

    return player.ratings?.[
        player.ratings.length - 1
    ] || {};

}

function getGoals(stats) {

    return (
        (stats.evG || 0) +
        (stats.ppG || 0) +
        (stats.shG || 0)
    );

}

function getAssists(stats) {

    return (
        (stats.evA || 0) +
        (stats.ppA || 0) +
        (stats.shA || 0)
    );

}

function getPoints(stats) {

    return (
        getGoals(stats) +
        getAssists(stats)
    );

}

function formatTOI(minutes) {

    if (!minutes) {

        return "0:00";

    }

    const mins =
        Math.floor(minutes);

    const secs =
        Math.round(
            (minutes - mins) * 60
        );

    return `${mins}:${secs
        .toString()
        .padStart(2,"0")}`;

}

function getTeamLogo(team) {

    return (
        team.imgURL ||
        team.imgURLSmall ||
        "GHL.png"
    );

}

function getTeamName(team) {

    return `${team.region} ${team.name}`;

}
