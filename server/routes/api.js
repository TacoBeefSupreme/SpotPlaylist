// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();
const SpotifyWebApi = require('spotify-web-api-node');

/*  This is a sample API route. */

const spotifyWebApi = new SpotifyWebApi({
  clientId: '45c5fde19e7944db94f3344760655569',
  clientSecret: '14b2d436ed6f4b328376beb28e44e05f'
});

router.get('/album', (req, res) => {
  spotifyWebApi
    .clientCredentialsGrant()
    .then(function(data) {
      spotifyWebApi.setAccessToken(data.body['access_token']);
      return spotifyWebApi.searchAlbums('Greater Than', { limit: 1 });
    })
    .then(function(data) {
      const albumId = data.body.albums.items[0].id;
      console.log(albumId);
      return spotifyWebApi.getAlbumTracks(albumId);
    })
    .then(function(data) {
      res.json({
        confirmation: 'success',
        data: data.body.items
      });
    })
    .catch(function(err) {
      console.log(err.message);
      res.json({
        confirmation: 'fail',
        message: err.message
      });
      return;
    });
});

router.get('/tracks', (req, res) => {
  spotifyWebApi
    .clientCredentialsGrant()
    .then(function(data) {
      spotifyWebApi.setAccessToken(data.body['access_token']);
      return spotifyWebApi.searchArtists('michael jackson', { limit: 10 });
    })
    .then(function(data) {
      const artistId = data.body.artists.items[0].id;
      return spotifyWebApi.getArtistTopTracks(artistId, 'US');
    })
    .then(function(data) {
      res.json({
        confirmation: 'success',
        data: data.body.tracks
      });
    })
    .catch(function(err) {
      console.log(err.message);
      res.json({
        confirmation: 'fail',
        message: err.message
      });
      return;
    });
});

router.get('/artwork/:id', (req, res) => {
  spotifyWebApi
    .clientCredentialsGrant()
    .then(function(data) {
      spotifyWebApi.setAccessToken(data.body['access_token']);
      return spotifyWebApi.getAlbum(req.params.id);
    })
    .then(function(data) {
      res.json({
        confirmation: 'success',
        data: data.body.images[0].url
      });
    })
    .catch(function(err) {
      console.log(err.message);
      res.json({
        confirmation: 'fail',
        message: err.message
      });
      return;
    });
});

router.get('/:resource', (req, res) => {
  res.json({
    confirmation: 'success',
    resource: req.params.resource,
    query: req.query // from the url query string
  });
});

// router.get('/:resource/:id', (req, res) => {
//   res.json({
//     confirmation: 'success',
//     resource: req.params.resource,
//     id: req.params.id,
//     query: req.query // from the url query string
//   });
// });

module.exports = router;
