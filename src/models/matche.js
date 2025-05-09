class Matche {
    constructor(id, result, times, roles, kills, assists, deaths, gold, dame,totalEloGap,stats,eloChange) {
        this.id = id;
        this.result = result;
        this.times = times;
        this.roles = roles;
        this.kills = kills;
        this.assists = assists;
        this.deaths = deaths;
        this.gold = gold;
        this.dame = dame;
        this.totalEloGap = totalEloGap;
        this.stats = stats
        this.eloChange = eloChange
        
    }
 
    // Tính toán và trả về thông số
    getStats() {
        const dpm = this.times > 0 ? this.dame / this.times : 0;
        const gpm = this.times > 0 ? this.gold / this.times : 0;
        const kda = this.deaths > 0 ? (this.kills + this.assists) / this.deaths : (this.kills + this.assists);
    
        const impactScore = kda + dpm * 10/1000 + gpm * 10/1000;
    
        const thresholds = {
            ad:    [34, 31, 28, 25, 22, 19, 16],
            solo:  [32, 29, 26, 23, 20, 17, 14],
            jg:    [30, 27, 24, 21, 18, 15, 12],
            sp:    [28, 25, 22, 19, 16, 13, 10],
        };
    
        let roleType;
        if (["mid", "top"].includes(this.roles)) roleType = "solo";
        else if (this.roles === "jg") roleType = "jg";
        else roleType = this.roles;
    
        const [sPlus, s, aPlus, a, bPlus, b, cPlus] = thresholds[roleType];
    
        let rank;
        if (impactScore > sPlus) rank = "S+";
        else if (impactScore > s) rank = "S";
        else if (impactScore > aPlus) rank = "A+";
        else if (impactScore > a) rank = "A";
        else if (impactScore > bPlus) rank = "B+";
        else if (impactScore > b) rank = "B";
        else if (impactScore > cPlus) rank = "C+";
        else rank = "C";
    
        return rank;
    }
    
    
}
module.exports = Matche;
