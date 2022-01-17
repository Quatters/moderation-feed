const getBulletins = require('./data-generator');
const express = require('express');

const app = express();

const host = 'localhost';
const port = 3001;

// предполагается, что в БД на момент обращения находится столько постов
const maxBulletins = 23;
let bulletinsGenerated = 0;
let bulletinsProcessed = true;
let prevBulletins = [];

app.get('/api/bulletins', (req, res) => {
  const requestCount = req.query.count || 10;

  if (bulletinsGenerated === maxBulletins)
    return res
      .status(204)
      .json({ success: false, msg: 'No bulletins available.' });

  if (bulletinsGenerated + requestCount > maxBulletins) {
    let bulletins = bulletinsProcessed
      ? getBulletins(maxBulletins - bulletinsGenerated)
      : prevBulletins;
    prevBulletins = bulletins;
    bulletinsProcessed = false;
    return res.status(200).json({ success: true, data: [...bulletins] });
  }

  let bulletins = bulletinsProcessed
    ? getBulletins(requestCount)
    : prevBulletins;
  prevBulletins = bulletins;
  bulletinsProcessed = false;
  return res.status(200).json({ success: true, data: [...bulletins] });
});

app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`);
});
