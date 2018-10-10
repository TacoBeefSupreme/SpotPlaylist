<template>
  <div class=".container " >
    <navBar />
    <div class="container">
       <searchBar />
    </div>
    <nowPlayingBar />
  </div>
   
</template>

<script>
import nowPlayingBar from './components/nowPlaying/nowPlayingBar';
import navBar from './components/navBar/navBar.vue';
import searchBar from './components/searchBar/searchBar';

export default {
  name: 'App',
  components: {
    nowPlayingBar,
    navBar,
    searchBar
  }
}
</script>

<style scoped>


</style>


