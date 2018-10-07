<template>
  <div class=".container " >
    <navBar />
    <nowPlayingBar />
  </div>
   
</template>

<script>
import nowPlayingBar from './components/nowPlaying/nowPlayingBar';
import navBar from './components/navBar/navBar.vue';

export default {
  name: 'App',
  components: {
    nowPlayingBar,
    navBar
  },
  // async mounted(){
  //   const topTracksResponse = await api.fetchTopTracks('eyasu');
  //   this.$store.dispatch('setPlaylist', topTracksResponse.data);
  //   this.$store.dispatch('setCurrentTrack', {
  //     currentTrack: this.$store.getters.getCurrentPlaylist[0],
  //     currentArtwork:  this.$store.getters.getCurrentPlaylist[0].album.images[0].url,
  //     currentTrackIndex: 0
  //   });
  // }
}
</script>

<style scoped>


</style>


