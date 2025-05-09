const express = require('express');
const router = express.Router();
const { loadDataFromFile } = require('../services/fileManager');
const { getPlayerStats } = require('../services/calculateElo');

router.get('/', (req, res) => {
  const players = loadDataFromFile();
  const stats = players.map(getPlayerStats).sort((a, b) => b.elo - a.elo);
  res.json(stats);
});

router.get('/:name', (req, res) => {
  const players = loadDataFromFile();
  const player = players.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
  if (!player) return res.status(404).json({ error: 'Player not found' });

  res.json({
    info: getPlayerStats(player),
    matches: player.matches
  });
});

module.exports = router;
