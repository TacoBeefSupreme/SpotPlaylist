import helpers from '../../assets/js/helpers';

const state = {
  playlist: undefined,
  currentTrack: undefined,
  currentArtwork: '',
  audioElement: undefined,
  shuffledPlaylist: [],
  playing: true,
  currentTime: '0:00',
  progress: '0%',
  remainingTime: '',
  volume: '100%',
  mouseDown: false,
  duration: 0,
  currentTrackIndex: 0,
  autoPlay: false,
  repeat: false,
  mute: false,
  shuffle: false
};

const getters = {
  getPlaylist: state => state.playlist,
  getCurrentTrack: state => state.currentTrack,
  getCurrentArtwork: state => state.currentArtwork,
  getAudioElement: state => state.audioElement,
  getShuffledPlaylist: state => state.shuffledPlaylist,
  isPlaying: state => state.playing,
  getCurrentTime: state => state.currentTime,
  getProgress: state => state.progress,
  getRemainingTime: state => state.remainingTime,
  getVolume: state => state.volume,
  isMouseDown: state => state.mouseDown,
  getDuration: state => state.duration,
  getCurrentTrackIndex: state => state.currentTrackIndex,
  isAutoPlay: state => state.autoPlay,
  isRepeat: state => state.repeat,
  isMute: state => state.mute,
  isShuffle: state => state.shuffle
};

const actions = {
  setPlaylist: (context, payload) => {
    context.commit('SET_PLAYLIST', payload);
  },
  setCurrentTrack: (context, payload) => {
    context.commit('SET_CURRENT_TRACK', payload.currentTrack);
    context.commit('SET_ARTWORK', payload.currentArtwork);
    context.commit('SET_CURRENT_TRACK_INDEX', payload.currentTrackIndex);
  },
  setAudioElement: (context, payload) => {
    context.commit('SET_AUDIO_ELEMENT', payload);
  },
  setMouseDown: (context, payload) => {
    context.commit('SET_MOUSE_DOWN', payload);
  },
  playPauseSong: (context, payload) => {
    context.commit('SET_PLAYING', payload.playing);
    if (payload.playSong) {
      context.commit('SET_AUDIO_ELEMENT_PLAY');
    } else {
      context.commit('SET_AUDIO_ELEMENT_PAUSE');
    }
  },
  repeatSong: (context, payload) => {
    context.commit('SET_REPEAT', payload);
  },
  muteSong: (context, payload) => {
    context.commit('SET_MUTE', payload);
  },
  setSuffle: (context, payload) => {
    if (payload.shuffle) {
      context.commit(
        'SET_SHUFFLED_PLAYLIST',
        context.getters.getPlaylist.slice()
      );
      context.commit(
        'SET_CURRENT_TRACK_INDEX',
        context.getters.getShuffledPlaylist.indexOf(
          context.getters.getCurrentTrack
        )
      );
    } else {
      context.commit(
        'SET_CURRENT_TRACK_INDEX',
        context.getters.getPlaylist.indexOf(context.getters.getCurrentTrack)
      );
    }
  }
};

const mutations = {
  // this.playlist = topTracksResponse.data;
  // this.currentTrack = this.playlist[0];
  // this.artwork = this.currentTrack.album.images[0].url

  SET_PLAYLIST: (state, payload) => {
    let topTracksOfArtist = payload;
    state.playlist = topTracksOfArtist;
  },
  SET_CURRENT_TRACK: (state, payload) => {
    state.currentTrack = payload;
  },
  SET_ARTWORK: (state, payload) => {
    state.currentArtwork = payload;
  },
  SET_AUDIO_ELEMENT: (state, payload) => {
    state.audioElement = payload;
  },
  SET_CURRENT_TRACK_INDEX: (state, payload) => {
    state.currentTrackIndex = payload;
  },
  SET_MOUSE_DOWN: (state, payload) => {
    state.mouseDown = payload;
  },
  SET_PLAYING: (state, payload) => {
    state.playing = payload;
  },
  SET_AUDIO_ELEMENT_PLAY: state => {
    state.audioElement.play();
  },
  SET_AUDIO_ELEMENT_PAUSE: state => {
    state.audioElement.pause();
  },
  SET_REPEAT: (state, payload) => {
    state.repeat = payload;
  },
  SET_MUTE: (state, payload) => {
    state.mute = payload;
    state.audioElement.muted = state.mute;
  },
  SET_SHUFFLED_PLAYLIST: (state, payload) => {
    state.shuffledPlaylist = payload;
    helpers.shuffle(state.shuffledPlaylist);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
