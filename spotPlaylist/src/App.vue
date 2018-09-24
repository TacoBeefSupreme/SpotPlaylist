<template>
  <div class=".container " >
    <nowPlayingBar @nextSong="onNextSong" />
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
  methods: {
    onNextSong(nextTrack){
      this.currentTrack = nextTrack;
      this.artwork = nextTrack.album.images[0].url;
    }
  },
  
  async mounted(){
    const topTracksResponse = await api.fetchTopTracks();
    this.$store.dispatch('setPlaylist', topTracksResponse.data);
    this.$store.dispatch('setCurrentTrack', {
      currentTrack: this.$store.getters.getPlaylist[0],
      currentArtwork:  this.$store.getters.getPlaylist[0].album.images[0].url,
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


