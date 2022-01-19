let count = 0;

function getBulletin() {
  count++;
  return {
    id: count,
    // TODO: возвращать дату в зависимости от count
    publishDate: Date.now(),
    publishDateString: '08:46, сегодня',
    ownerId: 1234567,
    ownerLogin: `Owner ${count}`,
    bulletinSubject: `Заголовок объявления ${count}`,
    bulletinText: `Текст объявления ${count}`,
    // TODO: возвращать от 1 до 3 изображений в массиве
    bulletinImages: [
      'https://static.baza.farpost.ru/v/1510541224458_hugeBlock',
    ],
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

module.exports = { getBulletins, resetCount };
