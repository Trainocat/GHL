# GHL Dynamic Rebuild — Stage 2

The site framework is now working.

Next step:
Convert the site from static placeholder content into a fully dynamic ZenGM-powered league portal using `league.json`.

# What Will Become Dynamic

- Home Page
- Standings
- Teams
- Team Pages
- Players
- Player Pages
- Schedule
- Game Centre
- Draft
- Playoffs

# Core Loader

```js
async function loadLeague() {
    const res = await fetch("league.json");
    return await res.json();
}
```

# Team Map

```js
function buildTeamMap(data) {
    const map = {};

    data.teams.forEach(team => {
        map[team.tid] = team;
    });

    return map;
}
```

# Dynamic Teams Example

```js
loadLeague().then(data => {

    const teams = [...data.teams]
        .sort((a, b) =>
            (a.region + a.name)
            .localeCompare(b.region + b.name)
        );

});
```

# Final Goal

- no hardcoded teams
- no hardcoded stats
- no placeholder rows
- every page powered entirely by `league.json`
