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
  getCurrentPlaylist: state => state.playlist,
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
    context.dispatch('setCurrentTrackIndex', payload.currentTrackIndex);
  },
  setAudioElement: (context, payload) => {
    context.commit('SET_AUDIO_ELEMENT', payload);
  },
  setMouseDown: (context, payload) => {
    context.commit('SET_MOUSE_DOWN', payload);
  },
  async playPauseSong(context, payload) {
    if (payload.playSong) {
      // play button was clicked
      if (context.getters.getCurrentTrack) {
        // takes care of case when user clicks play button before song is loaded from server
        context.commit('SET_PLAYING', payload.playing);
        try {
          await context.state.audioElement.play();
        } catch (err) {
          // eslint-disable-next-line
          console.log(err.message);
        }
      }
    } else {
      // pause button was clicked
      context.commit('SET_PLAYING', payload.playing);
      try {
        await context.state.audioElement.pause();
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
      }
    }
  },
  repeatSong: (context, payload) => {
    context.commit('SET_REPEAT', payload);
  },
  muteSong: (context, payload) => {
    context.commit('SET_MUTE', payload);
  },
  setSuffle: (context, payload) => {
    context.commit('SET_SHUFFLE', payload.shuffle);

    if (payload.shuffle) {
      context.commit(
        'SET_SHUFFLED_PLAYLIST',
        context.getters.getCurrentPlaylist.slice()
      );
      context.dispatch(
        'setCurrentTrackIndex',
        context.getters.getShuffledPlaylist.indexOf(
          context.getters.getCurrentTrack
        )
      );
    } else {
      context.dispatch(
        'setCurrentTrackIndex',
        context.getters.getCurrentPlaylist.indexOf(
          context.getters.getCurrentTrack
        )
      );
    }
  },
  setAutoPlay: (context, payload) => {
    context.commit('SET_AUTO_PLAY', payload);
  },
  setAudioElementCurrentTime: (context, payload) => {
    context.commit('SET_AUDIO_ELEMENT_CURRENT_TIME', payload);
  },
  setCurrentTrackIndex: (context, payload) => {
    context.commit('SET_CURRENT_TRACK_INDEX', payload);
  },
  setCurrentTime: (context, payload) => {
    context.commit('SET_CURRENT_TIME', payload);
  },
  setDuration: (context, payload) => {
    context.commit('SET_DURATION', payload);
  },
  setRemainingTime: (context, payload) => {
    context.commit('SET_REMAINING_TIME', payload);
  },
  setProgress: (context, payload) => {
    context.commit('SET_PROGRESS', payload);
  },
  setVolume: (context, payload) => {
    context.commit('SET_VOLUME', payload);
  },
  setAudioElementVolumePercentage: (context, payload) => {
    context.commit('SET_AUDIO_ELEMENT_VOLUME_PERCENTAGE', payload);
  },
  setNextTrack(context) {
    const playlistSize = context.getters.getCurrentPlaylist.length - 1;

    if (context.getters.isRepeat) {
      context.dispatch('setAudioElementCurrentTime', 0);
      context.dispatch('playPauseSong', {
        playing: false,
        playSong: true
      });
      return;
    } else if (context.getters.getCurrentTrackIndex == playlistSize) {
      // go back to start
      context.dispatch('setCurrentTrackIndex', 0);
    } else {
      let curIndex = context.getters.getCurrentTrackIndex;
      context.dispatch('setCurrentTrackIndex', (curIndex += 1));
    }

    const nextTrack = context.getters.isShuffle
      ? context.getters.getShuffledPlaylist[
          context.getters.getCurrentTrackIndex
        ]
      : context.getters.getCurrentPlaylist[
          context.getters.getCurrentTrackIndex
        ];

    // pause the song first
    context.dispatch('playPauseSong', {
      playing: true,
      playSong: false
    });

    context.dispatch('setAutoPlay', true);

    context.dispatch('setCurrentTrack', {
      currentTrack: nextTrack,
      currentArtwork: nextTrack.album.images[0].url,
      currentTrackIndex: context.getters.getCurrentTrackIndex
    });
  },
  setPrevTrack(context) {
    if (
      context.getters.getCurrentTrackIndex == 0 ||
      context.getters.getAudioElement.currentTime >= 2
    ) {
      context.dispatch('setAudioElementCurrentTime', 0);
    } else {
      let currIndex = context.getters.getCurrentTrackIndex;
      context.dispatch('setCurrentTrackIndex', (currIndex -= 1));

      const nextTrack =
        context.getters.getCurrentPlaylist[
          context.getters.getCurrentTrackIndex
        ];

      context.dispatch('playPauseSong', {
        playing: true,
        playSong: false
      });

      context.dispatch('setAutoPlay', true);
      context.dispatch('setCurrentTrack', {
        currentTrack: nextTrack,
        currentArtwork: nextTrack.album.images[0].url,
        currentTrackIndex: context.getters.getCurrentTrackIndex
      });
    }
  }
};

const mutations = {
  SET_PLAYLIST: (state, payload) => {
    if (state.playlist != payload) {
      state.playlist = payload;
    }
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

export default {
  state,
  getters,
  actions,
  mutations
};
