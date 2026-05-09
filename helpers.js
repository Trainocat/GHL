
async function loadLeague() {

    const response =
        await fetch("league.json");

    return await response.json();

}

function currentSeason(data) {

    return data.gameAttributes.season;

}

function currentSeasonTeam(team, season) {

    return team.seasons?.find(s => {

        return s.season === season;

    }) || team.seasons?.[
        team.seasons.length - 1
    ] || {};

}

function currentSeasonStats(player, season) {

    return player.stats?.find(stat => {

        return (
            stat.season === season &&
            !stat.playoffs
        );

    }) || player.stats?.[
        player.stats.length - 1
    ] || {};

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

    return `${mins}:${secs.toString().padStart(2,"0")}`;

}
