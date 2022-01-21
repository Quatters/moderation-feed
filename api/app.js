const { getBulletins, resetCount } = require('./data-generator');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.static(__dirname + '/client/'));

const host = 'localhost';
const port = 3001;

// предполагается, что в БД на момент обращения находится столько постов
const maxBulletins = 23;
let bulletinsGenerated = 0;
let bulletinsProcessed = true;
let prevBulletins = [];

app.get('/api/bulletins', (req, res) => {
  let requestCount = req.query.count || 10;

  if (!bulletinsProcessed) return res.status(200).json(prevBulletins);
  if (bulletinsGenerated === maxBulletins) return res.sendStatus(204);

  let bulletins;
  if (bulletinsGenerated + requestCount > maxBulletins) {
    requestCount = maxBulletins - bulletinsGenerated;
  }
  bulletins = getBulletins(requestCount);
  bulletinsGenerated += requestCount;

  bulletinsProcessed = false;
  prevBulletins = bulletins;
  return res.status(200).json(bulletins);
});

app.post('/api/bulletins', (req, res) => {
  console.log(`Обработанные объявления от ${new Date()}`);
  console.table(req.body);
  bulletinsProcessed = true;
  return res.sendStatus(200);
});

app.get('/api/bulletins/reset', (req, res) => {
  bulletinsGenerated = 0;
  bulletinsProcessed = true;
  resetCount();
  return res.sendStatus(200);
});

app.get('/', (req, res) => {
  return res.sendFile('index.html', { root: 'client' });
});

app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`);
});
