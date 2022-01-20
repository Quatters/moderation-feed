let count = 0;

function getBulletin() {
  count++;
  return {
    id: count,
    publishDate: Date.now(),
    publishDateString: new Date().toLocaleString('ru-RU'),
    ownerId: 1234567,
    ownerLogin: `Owner ${count}`,
    bulletinSubject: `Заголовок объявления ${count}`,
    bulletinText: generateText(),
    bulletinImages: generateImageArray(),
  };
}

function getBulletins(count) {
  let bulletins = [];
  for (let i = 0; i < count; i++) {
    bulletins.push(getBulletin());
  }

  return bulletins;
}

function resetCount() {
  count = 0;
}

function generateImageArray() {
  const imageCount = Math.floor(Math.random() * 4);
  let images = [];
  for (let i = 0; i < imageCount; i++) {
    images.push('https://static.baza.farpost.ru/v/1510541224458_hugeBlock');
  }
  return images;
}

function generateText() {
  const phrasesCount = Math.floor(Math.random() * 299) + 1;
  let phrase = `Текст объявления ${count} `;
  let text = '';
  for (let i = 0; i < phrasesCount; i++) {
    text += phrase;
  }
  return text;
}

module.exports = { getBulletins, resetCount };
