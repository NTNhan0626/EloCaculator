// src/ui/uiRoutes.js
const express = require('express');
const router = express.Router();
const { loadDataFromFile } = require('../services/fileManager');
const { getPlayerStats } = require('../services/calculateElo');

// Trang chính - Top 10
router.get('/', (req, res) => {
  const players = loadDataFromFile();
  const stats = players.map(getPlayerStats).sort((a, b) => b.elo - a.elo);
  res.render('topPlayer', { players: stats.slice(0, 10) });
});

// Hiển thị toàn bộ danh sách
router.get('/players/all', (req, res) => {
  const players = loadDataFromFile();
  const stats = players.map(getPlayerStats).sort((a, b) => b.elo - a.elo);
  res.render('allPlayers', { players: stats });
});

// Chi tiết người chơi
router.get('/players/:name', (req, res) => {
  const players = loadDataFromFile();
  const player = players.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
  console.log(player.matches)
  if (!player) return res.status(404).send('<h2>Không tìm thấy người chơi</h2>');

  res.render('playerDetail', { player });
});

module.exports = router;
