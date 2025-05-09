const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '../data/players.json');
const Player = require('../models/player');     
const Matche = require('../models/matche');     

function saveDataToFile(data){
    try {
        fs.writeFileSync(FILE_PATH,JSON.stringify(data,null,2));
        console.log("write success");
    } catch (error) {
        console.log("write file err");
    }
}
function loadDataFromFile() {
    let players = [];
    if (fs.existsSync(FILE_PATH)) {
        try {
            const rawData = fs.readFileSync(FILE_PATH, 'utf8');
            if (!rawData || rawData.trim() === '') return [];

            const parsed = JSON.parse(rawData);

            // Khởi tạo lại đúng class
            return parsed.map(p => {
                const player = new Player(p.id, p.name, p.elo, []);
                player.matches = p.matches.map(m => new Matche(
                    m.id,
                    m.result,
                    m.times,
                    m.roles,
                    m.kills,
                    m.assists,
                    m.deaths,
                    m.gold,
                    m.dame,
                    m.totalEloGap,
                    m.stats // nếu bạn lưu cả stats
                ));
                return player;
            });
        } catch (err) {
            console.error("loadDataFromFile error:", err);
            return [];
        }
    }

    
    return [];
}

module.exports = {saveDataToFile,loadDataFromFile};
