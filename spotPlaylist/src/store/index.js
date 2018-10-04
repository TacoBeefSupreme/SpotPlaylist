import Vuex from 'vuex';
import Vue from 'vue';
import Playlist from './modules/PlaylistAudio';
import Search from './modules/Search';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Playlist,
    Search
  }
});
