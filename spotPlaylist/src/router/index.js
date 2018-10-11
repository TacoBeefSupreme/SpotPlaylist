import Vue from 'vue';
import Router from 'vue-router';
import SigIn from '../components/User/signIn';
import SignUp from '../components/User/signUp';
import Home from '../components/Home';
import PlaylistTable from '../components/playlistTable/playlistTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/playlist/:query',
      name: 'Playlist',
      component: PlaylistTable
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SigIn
    },
    {
      path: 'signup',
      name: 'Signup',
      component: SignUp
    }
  ],
  mode: 'history'
});
