const Player = require('../models/player')
const Matche = require('../models/matche')

function generaPlayer(number) {
    const players = [];
    for (let i = 0; i < number; i++) {
        players.push(new Player(i, "pl" + i , 1000,[]))
    }
    return players;
}



function generaInforMatche() {
    const times = (Math.random() * 45 + 1) + 15; // randome times of match beween 15 - 50p
    const kills = Math.floor(Math.random() * (times * 1.2) + 1);
    const assists = Math.floor(Math.random() * (times * 1.5) + 1);
    const deaths = Math.floor(Math.random() * times + 1);
    const gold = (Math.random() * (times - 0.71) + 0.71) * 0.7 * 1000;
    const roles = ["ad", "sp", "mid", "top", "jg"];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const totalEloGap = Math.floor(Math.random() * 501) - 250;
    const result = Math.floor(Math.random() * 2);
    const dame = Math.random()*times*1.8*1000;
    return {times,kills,assists,deaths,gold,randomRole,totalEloGap,result,dame};

}

function generaMatchesForPlayer(players, number) {
    players.forEach(player => {
        let idMatcher = 0;
        for(let i = 0 ;i< number;i++){
            const data = generaInforMatche();
            const matcher = new Matche(
                idMatcher,
                data.result,
                data.times,
                data.randomRole,
                data.kills,
                data.assists,
                data.deaths,
                data.gold,
                data.dame,
                data.totalEloGap
            )
            matcher.stats = matcher.getStats();
            idMatcher++;
            player.matches.push(matcher);
        }

    });
}
function generaMatch( matchId) {
    const data = generaInforMatche();

    const match = new Matche(
        matchId,
        data.result,
        data.times,
        data.randomRole,
        data.kills,
        data.assists,
        data.deaths,
        data.gold,
        data.dame,
        data.totalEloGap
    );

    match.stats = match.getStats();

}


module.exports = {generaPlayer,generaMatchesForPlayer,generaMatch};