class Player {
    constructor(id, name, elo, matches) {
        this.id =id;
        this.name = name;
        this.elo = elo;
        this.matches = matches
    }

    updateElo(elo) {
        this.elo += elo;
    }
}
module.exports = Player;