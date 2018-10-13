<template>
  <v-app>
    <router-view></router-view>  
  </v-app> 
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>



