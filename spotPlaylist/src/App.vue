<template>
  <div>
    <router-view></router-view>
  </div>
   
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

<style scoped>

  #con {
      padding-bottom: 100px;
  }
  
</style>


