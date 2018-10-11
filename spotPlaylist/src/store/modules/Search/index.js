import api from '../../../api';
import _ from 'lodash';

const state = {
  selectedArtistId: '',
  artists: [],
  suggestionsDivVisible: false,
  searchedPlaylist: [],
  loading: false
};

const getters = {
  getArtistId: state => state.selectedArtistId,
  getArtists: state => state.artists,
  isSuggestionDivVisible: state => state.suggestionsDivVisible,
  getSearchedPlaylist: state => state.getSearchedPlaylist,
  isLoading: state => state.loading
};

const actions = {
  searchArtistId({ commit, getters }, payload) {
    api
      .fetchArtistId(payload)
      .then(data => {
        const artistList = data.data.items;
        const { statusCode } = data.data;
        if (statusCode === 304 || artistList.length == 0) {
          commit('SET_ARTISTS_SEARCH_QUERY', getters.getArtists);
        } else {
          commit('SET_ARTISTS_SEARCH_QUERY', artistList);
        }
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err.message);
        commit('SET_SUGGESTIONS_DIV_VISIBILTY', false);
      });
  },

  async searchArtistTopTrack({ dispatch, commit, getters }) {
    commit('SET_LOADING', true);
    let topTracksResponse = undefined;
    try {
      topTracksResponse = await api.fetchTopTracks(getters.getArtistId);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.message);
    }

    dispatch('setPlaylist', topTracksResponse.data)
      .then(() => {
        dispatch('setSuffle', {
          shuffle: true,
          loadingNewPlaylist: true
        });
        commit('SET_LOADING', false);
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err.message);
        commit('SET_LOADING', false);
      });

    /// move this to table componet, set it first track in table component later on
    // maybe table component should have its own playlist and current track state??
    // dispatch(
    //   'setCurrentTrack',
    //   {
    //     currentTrack: rootGetters.getCurrentPlaylist[0],
    //     currentArtwork: rootGetters.getCurrentPlaylist[0].album.images[0].url,
    //     currentTrackIndex: 0
    //   },
    //   { root: true }
    // );
  },
  setSelectedArtistId: ({ commit }, payload) => {
    commit('SET_SELECTED_ARTIST_ID', payload);
  },
  setFilteredArist: ({ commit }, payload) => {
    commit('SET_ARTISTS_SEARCH_QUERY', payload);
  },
  setSuggestionsDivVisiblilty: ({ commit }, payload) => {
    commit('SET_SUGGESTIONS_DIV_VISIBILTY', payload);
  },
  setSearchedPlaylist: ({ commit }, payload) => {
    commit('SET_SEARCHED_PLAYLIST', payload);
  }
};

const mutations = {
  SET_SELECTED_ARTIST_ID: (state, payload) => {
    state.selectedArtistId = payload;
  },
  SET_ARTISTS_SEARCH_QUERY: (state, payload) => {
    state.artists = payload;
  },
  SET_SUGGESTIONS_DIV_VISIBILTY: (state, payload) => {
    state.suggestionsDivVisible = payload;
  },
  SET_SEARCHED_PLAYLIST: (state, payload) => {
    state.searchedPlaylist = payload;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
