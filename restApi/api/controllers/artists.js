const config = require('../../config.js');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyWebApi = new SpotifyWebApi({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
});

spotifyWebApi
  .clientCredentialsGrant()
  .then(data => {
    // Save the access token so that it's used in future calls
    spotifyWebApi.setAccessToken(data.body['access_token']);
  })
  .catch(err => {
    console.log('error retrieving an access token', err);
  });

exports.getArtistWithName = (req, res, next) => {
  let artistName;
  if (req.params.name) {
    artistName = req.params.name;
  }

  spotifyWebApi
    .searchArtists(artistName, { limit: 10 })
    .then(data => {
      //const artistId = data.body.artists.items[0].id;
      const artistId = data.body.artists.items;
      res.status(200).json({
        confirmation: 'success',
        data: artistId
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(404).json({
        confirmation: 'fail',
        message: err.message
      });
    });
};

exports.getArtistTopTracks = (req, res, next) => {
  let artistId;
  if (req.params.id) {
    artistId = req.params.id;

    spotifyWebApi
      .getArtistTopTracks(artistId, 'US')
      .then(data => {
        res.status(200).json({
          confirmation: 'success',
          data: data.body.tracks
        });
      })
      .catch(err => {
        console.log(err.message);
        res.status(404).json({
          confirmation: 'fail',
          message: err.message
        });
      });
  }
};
