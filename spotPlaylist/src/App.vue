<template>
  <div class=".container " >
    <navBar />
    <div id="con">
      <searchBar />
      <playlistTable />
    </div>
    <nowPlayingBar />
  </div>
   
</template>

<script>
import nowPlayingBar from './components/nowPlaying/nowPlayingBar';
import navBar from './components/navBar/navBar.vue';
import searchBar from './components/searchBar/searchBar';
import playlistTable from './components/playlistTable/playlistTable';

export default {
  name: 'App',
  components: {
    nowPlayingBar,
    navBar,
    searchBar,
    playlistTable
  }
}
</script>

<style scoped>

  #con {
      padding-bottom: 100px;
  }

</style>


