import api from '../../../api';

const state = {
  searchQuery: '',
  artistId: ''
};

const getters = {
  getSearchQuery: state => state.query,
  getArtistId: state => state.artistId
};

const actions = {
  setSearchQuery: ({ commit }, payload) => {
    commit('SET_SEARCH_QUERY', payload);
  },
  async searchArtistId({ commit }, payload) {
    let artistIdResponse = undefined;
    try {
      artistIdResponse = await api.fetchArtistId(payload);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.message);
    }
    commit('SET_ARTIST_ID', artistIdResponse.data);
  },
  async searchArtistTopTrack({ dispatch, rootGetters, getters }) {
    let topTracksResponse = undefined;
    try {
      topTracksResponse = await api.fetchTopTracks(getters.getArtistId);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.message);
    }

    dispatch('setPlaylist', topTracksResponse.data, { root: true });

    /// move this to table componet, set it first track in table component later on
    // maybe table component should have its own playlist and current track state??
    dispatch(
      'setCurrentTrack',
      {
        currentTrack: rootGetters.getCurrentPlaylist[0],
        currentArtwork: rootGetters.getCurrentPlaylist[0].album.images[0].url,
        currentTrackIndex: 0
      },
      { root: true }
    );
  }
};

const mutations = {
  SET_SEARCH_QUERY: (state, payload) => {
    state.searchQuery = payload;
  },
  SET_ARTIST_ID: (state, payload) => {
    state.artistId = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
