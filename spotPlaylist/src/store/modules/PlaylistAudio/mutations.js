import helpers from '../../../assets/js/helpers';

const mutations = {
  SET_PLAYLIST: (state, payload) => {
    state.playlist = payload;
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
  SET_REPEAT: (state, payload) => {
    state.repeat = payload;
  },
  SET_MUTE: (state, payload) => {
    state.mute = payload;
    state.audioElement.muted = state.mute; // is audioElement.mute a syncronouse call?? check
  },
  SET_SHUFFLE: (state, payload) => {
    state.shuffle = payload;
  },
  SET_SHUFFLED_PLAYLIST: (state, payload) => {
    state.shuffledPlaylist = payload;
    helpers.shuffle(state.shuffledPlaylist);
  },
  SET_AUDIO_ELEMENT_CURRENT_TIME: (state, payload) => {
    state.audioElement.currentTime = payload; // is audioElement.currentTime a syncronouse call?? check
  },
  SET_AUTO_PLAY: (state, payload) => {
    state.autoPlay = payload;
  },
  SET_DURATION: (state, payload) => {
    state.duration = payload;
  },
  SET_CURRENT_TIME: (state, payload) => {
    state.currentTime = payload;
  },
  SET_REMAINING_TIME: (state, payload) => {
    state.remainingTime = payload;
  },
  SET_PROGRESS: (state, payload) => {
    state.progress = payload;
  },
  SET_VOLUME: (state, payload) => {
    state.volume = payload;
  },
  SET_AUDIO_ELEMENT_VOLUME_PERCENTAGE: (state, payload) => {
    state.audioElement.volume = payload;
  }
};

export default mutations;
