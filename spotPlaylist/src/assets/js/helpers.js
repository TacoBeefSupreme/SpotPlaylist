export default {
  formatTime(durationInSeconds) {
    const time = Math.round(durationInSeconds);
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    const extraZero = seconds < 10 ? '0' : '';
    return `${minutes}:${extraZero}${seconds}`;
  },

  timeFromOffset(mouse, progressBar, duration) {
    const percent = mouse.offsetX / progressBar.clientWidth;
    const seconds = duration * percent;
    return seconds;
  },

  volumePercentageOffset(mouse, volumeProgressBar) {
    return mouse.offsetX / volumeProgressBar.clientWidth;
  },

  shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
  }
};
