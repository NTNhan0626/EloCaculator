const Player = require('../models/player')
const Matche = require('../models/matche')

function generaPlayer(number){
    const players = [];
    for(let i =0 ;i<number;i++){
        players.push(new Player(i,"pl"+ i+1,1000,[]))
    }
    return players;
}

const players = generaPlayer(100);

const player = players[10];
player.updateElo(20);
console.log(players);