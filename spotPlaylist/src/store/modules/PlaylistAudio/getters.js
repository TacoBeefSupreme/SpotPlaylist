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

export default getters;
