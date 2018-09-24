// const ROOT_URL = 'https://spotrestapi-kgfipe.turbo360-vertex.com';
const ROOT_URL = 'http://localhost:3000';

export default {
  fetchAlbumTracks() {
    return fetch(`${ROOT_URL}/api/album`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  },

  // temp way to fetch artwork until search by top rated tracks of artists in implement
  fetchArtwork() {
    const id = '6NijWPXUijjGcrdkQFcflv';
    return fetch(`${ROOT_URL}/api/artwork/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  },

  fetchTopTracks() {
    return fetch(`${ROOT_URL}/api/tracks`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }
};
