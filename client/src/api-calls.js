import axios from 'axios';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://moderation-feed.herokuapp.com'
    : 'http://localhost:3001';

export async function getBulletins() {
  const response = await axios.get(apiUrl + '/api/bulletins');
  return response;
}

export async function saveBulletins(bulletins) {
  const requestBulletins = bulletins.map(bulletin => {
    return {
      id: bulletin.id,
      status: bulletin.status,
      message: bulletin.message,
    };
  });
  const response = await axios.post(
    apiUrl + '/api/bulletins',
    requestBulletins
  );
  return response;
}

export async function resetBulletins(bulletins) {
  const response = await axios.get(apiUrl + '/api/bulletins/reset');
  return response;
}
