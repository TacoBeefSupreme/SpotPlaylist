const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/artists');

// routes
router.get('/:name', ArtistController.getArtistWithName);
router.get('/:id/toptracks', ArtistController.getArtistTopTracks);

module.exports = router;
