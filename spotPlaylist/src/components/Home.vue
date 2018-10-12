<template>
  <div class=".container">
    <navBar />    
    <div id="con">
      <searchBar />
      <!-- <playlistTable /> -->
      <router-view></router-view>
    </div>
    <nowPlayingBar v-if="isCurrentPlaylist"/>
  </div>
   
</template>

<script>
import landingPage from './Landing/landing';
import nowPlayingBar from './NowPlayingBar/nowPlayingBar';
import navBar from './NavBar/nav';
import searchBar from './SearchBar/search';
import Loader from './Shared/Loader';

export default {
  name: 'Home',
  components: {
    nowPlayingBar,
    navBar,
    searchBar,
    Loader,
    landingPage
  },
  computed: {
    loading(){
      return this.$store.getters.isLoading;
    },
    isCurrentPlaylist(){
      if(this.$store.getters.getCurrentPlaylist){
        return true;
      }
      return false;
    }
  },
  created() {
    this.$router.push({path: '/saved/playlists'});
  },
}
</script>

<style scoped>

  #con {
      padding-bottom: 100px;
  }
  
</style>


