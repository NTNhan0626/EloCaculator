const express = require('express');
const path = require('path');
const app = express();

const uiRoutes = require('./ui/uiRoutes');
const apiRoutes = require('./controllers/playerController');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ui/views'));

app.use('/', uiRoutes);
app.use('/api/players', apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
