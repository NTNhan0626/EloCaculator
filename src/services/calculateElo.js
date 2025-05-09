const { generaPlayer, generaMatchesForPlayer } = require('./generateData');

const { saveDataToFile, loadDataFromFile } = require('./fileManager');

let players = []


function generaData() {
    players = generaPlayer(100);  
    generaMatchesForPlayer(players, 10);  
    calculateEloWithSampleDate(); 
    return players; 
}


function loadData() {
    players = loadDataFromFile();
    if (players.length === 0) {
        players = generaData();
    }
}
loadData();

function calculateEloNewMatch(player, match) {
    let poit = 0;
    if (match.result) {
        poit += 20;
        const stat = match.stats;
        if (stat === 'B') {
            poit += 2;
        } else if (stat === 'B+') {
            poit += 3;
        } else if ((stat === 'A')) {
            poit += 4;
        } else if (stat === 'A+') {
            poit += 5;
        } else if ((stat === 'S')) {
            poit += 6;
        } else if ((stat === 'S+')) {
            poit += 7;
        }
        let streak = 1;
        let index = player.matches.length - 1;
        while (index >= 0 && player.matches[index].result === 1 && streak < 10) {
            streak++;
            index--;
        }
        poit += streak;

        poit += Math.round(match.totalEloGap / 50);

        console.log(stat);
        console.log(streak);
        console.log(Math.round(match.totalEloGap / 50))

        match.eloChange = poit;
        player.updateElo(poit);
        player.matches.push(match);

    } else {
        poit -= 15;
        const stat = match.stats;
        if (stat === 'C') {
            poit -= 3;
        } else if ((stat === 'C+')) {
            poit -= 2;
        } else if (stat === 'B') {
            poit += 2;
        } else if (stat === 'B+') {
            poit += 3;
        } else if ((stat === 'A')) {
            poit += 4;
        } else if (stat === 'A+') {
            poit += 5;
        } else if ((stat === 'S')) {
            poit += 6;
        } else if ((stat === 'S+')) {
            poit += 7;
        }
        let streak = 1;
        let index = player.matches.length - 1;
        while (index >= 0 && player.matches[index].result === 0 && streak < 10) {
            streak++;
            index--;
        }
        poit -= streak;

        poit += Math.round(match.totalEloGap / 50);
        match.eloChange = poit;
        player.updateElo(poit);
        player.matches.push(match);
    }

}

function calculateEloWithSampleMatch(player, match) {
    let poit = 0;
    if (match.result) {
        poit += 20;
        const stat = match.stats;
        if (stat === 'B') {
            poit += 2;
        } else if (stat === 'B+') {
            poit += 3;
        } else if ((stat === 'A')) {
            poit += 4;
        } else if (stat === 'A+') {
            poit += 5;
        } else if ((stat === 'S')) {
            poit += 6;
        } else if ((stat === 'S+')) {
            poit += 7;
        }
        let streak = 1;
        let index = player.matches.length - 1;
        while (index >= 0 && player.matches[index].result === 1 && streak < 10) {
            streak++;
            index--;
        }
        poit += streak;

        poit += Math.round(match.totalEloGap / 50);

        // console.log(stat);
        // console.log(streak);
        // console.log(Math.round(match.totalEloGap / 50))
        match.eloChange = poit;
        player.updateElo(poit);


    } else {
        poit -= 15;
        const stat = match.stats;
        if (stat === 'C') {
            poit -= 3;
        } else if ((stat === 'C+')) {
            poit -= 2;
        } else if (stat === 'B') {
            poit += 2;
        } else if (stat === 'B+') {
            poit += 3;
        } else if ((stat === 'A')) {
            poit += 4;
        } else if (stat === 'A+') {
            poit += 5;
        } else if ((stat === 'S')) {
            poit += 6;
        } else if ((stat === 'S+')) {
            poit += 7;
        }
        let streak = 1;
        let index = player.matches.length - 1;
        while (index >= 0 && player.matches[index].result === 0 && streak < 10) {
            streak++;
            index--;
        }
        poit -= streak;

        poit += Math.round(match.totalEloGap / 50);
        match.eloChange = poit;
        player.updateElo(poit);
    }

}


function calculateEloWithSampleDate() {
    players.forEach(player => {
        player.matches.forEach(match => {
            calculateEloWithSampleMatch(player, match);
        })

    })
    saveDataToFile(players);
}

function getPlayerStats(player) {
    const totalMatches = player.matches.length;
    const winMatches = player.matches.filter(m => m.result === 1).length;
    const loseMatches = totalMatches - winMatches;
    const winRate = totalMatches > 0 ? (winMatches / totalMatches * 100).toFixed(2) : 0;

    return {
        name: player.name,
        totalMatches,
        winMatches,
        loseMatches,
        winRate: `${winRate}%`,
        elo: player.elo
    };
}

function showAllPlayerStats(players) {
    const stats = players.map(getPlayerStats);
    stats.sort((pl1,pl2)=> pl2.elo - pl1.elo);
    
    console.table(stats);
}

module.exports = {
    getPlayerStats,
    
  };
  




