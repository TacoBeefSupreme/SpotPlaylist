<template>
  <div class=".container " >
    <nowPlayingBar />
  </div>
   
</template>

<script>
import nowPlayingBar from './components/nowPlaying/nowPlayingBar';
import api from './api';

export default {
  name: 'App',
  components: {
    nowPlayingBar
  },
  async mounted(){
    const topTracksResponse = await api.fetchTopTracks();
    this.$store.dispatch('setPlaylist', topTracksResponse.data);
    this.$store.dispatch('setCurrentTrack', {
      currentTrack: this.$store.getters.getCurrentPlaylist[0],
      currentArtwork:  this.$store.getters.getCurrentPlaylist[0].album.images[0].url,
      currentTrackIndex: 0
    });

  }
}
</script>

<style scoped>
  .container{
    background-color: rgb(246,246,246);
  }

</style>


