<template>
  <v-app>
    <navBar/>
    <v-content>
        <v-container fluid>
          <router-view></router-view>
          <nowPlayingBar v-if="this.$store.getters.getCurrentPlaylist" />
        </v-container>
      </v-content>
  </v-app>
  
</template>

<script>
import landingPage from './Landing/landing';
import nowPlayingBar from './NowPlayingBar/nowPlayingBar';
import navBar from './NavBar/nav';
import Loader from './Shared/Loader';

export default {
  name: 'Home',
  components: {
    nowPlayingBar,
    navBar,
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



