<template>
  <div class=".container">
    <navBar />    
    <div id="con">
      <searchBar />
      <div v-if="loading">
        <Loader :width="60" :height="60" :borderSize="8" />
      </div>
      <div v-else>
        <playlistTable />
      </div>
    </div>
    <nowPlayingBar />
  </div>
   
</template>

<script>
import nowPlayingBar from './components/nowPlaying/nowPlayingBar';
import navBar from './components/navBar/navBar.vue';
import searchBar from './components/searchBar/searchBar';
import playlistTable from './components/playlistTable/playlistTable';
import Loader from './components/shared/Loader';

export default {
  name: 'App',
  components: {
    nowPlayingBar,
    navBar,
    searchBar,
    playlistTable,
    Loader
  },
  computed: {
    loading(){
      return this.$store.getters.isLoading;
    }
  }
}
</script>

<style scoped>

  #con {
      padding-bottom: 100px;
  }
  
</style>


