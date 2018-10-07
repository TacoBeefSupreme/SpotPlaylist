import api from '../../../api';

const state = {
  selectedArtistId: '',
  artists: []
};

const getters = {
  getArtistId: state => state.selectedArtistId,
  getArtists: state => state.artists
};

const actions = {
  async searchArtistId({ commit }, payload) {
    let artistIdResponse = undefined;
    try {
      artistIdResponse = await api.fetchArtistId(payload);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.message);
    }
    //commit('SET_SELECTED_ARTIST_ID', artistIdResponse.data);
    commit('SET_ARTISTS_SEARCH_QUERY', artistIdResponse.data);
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
  },
  setSelectedArtistId: ({ commit }, payload) => {
    commit('SET_SELECTED_ARTIST_ID', payload);
  },
  setFilteredArist: ({ commit }, payload) => {
    commit('SET_ARTISTS_SEARCH_QUERY', payload);
  }
};

const mutations = {
  SET_SELECTED_ARTIST_ID: (state, payload) => {
    state.selectedArtistId = payload;
  },
  SET_ARTISTS_SEARCH_QUERY: (state, payload) => {
    state.artists = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
