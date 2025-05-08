class Matche {
    constructor(id, result, times, roles, kills, assists, deaths, gold, dame) {
        this.id = id;
        this.result = result;
        this.times = times;
        this.roles = roles;
        this.kills = kills;
        this.assists = assists;
        this.deaths = deaths;
        this.gold = gold;
        this.dame = dame;
    }

    // Tính toán và trả về thông số
    getStats() {
        const dps = this.times > 0 ? this.dame / this.times : 0;
        const kda = this.deaths > 0 ? (this.kills + this.assists) / this.deaths : (this.kills + this.assists);
    
        const impactScore = kda + (this.gold / 10000) + (this.dame / 10000);
    
        // Thiết lập ngưỡng xếp hạng theo vai trò
        const thresholds = {
            ad:    [20, 17, 14, 11, 8],  // AD yêu cầu cao
            solo:  [19, 16, 13, 10, 7],  // Mid, Top
            jg:    [18, 15, 12, 9, 6],   // Jungle
            sp:    [17, 14, 11, 8, 5],   // Support
        };
    
        // Phân loại vai trò
        let roleType;
        if (["mid", "top"].includes(this.roles.toLowerCase())) roleType = "solo";
        else if (["jg", "jungle", "rừng"].includes(this.roles.toLowerCase())) roleType = "jg";
        else if (["ad", "xạ thủ"].includes(this.roles.toLowerCase())) roleType = "ad";
        else roleType = "sp"; // mặc định là support
    
        const [sPlus, s, a, b, cPlus] = thresholds[roleType];
    
        // Xếp hạng theo ngưỡng vai trò
        let rank;
        if (impactScore > sPlus) rank = "S+";
        else if (impactScore > s) rank = "S";
        else if (impactScore > a) rank = "A";
        else if (impactScore > b) rank = "B";
        else if (impactScore > cPlus) rank = "C+";
        else rank = "C";
    
        return {
            rank
        };
    }

    
}
module.exports = Matche;
