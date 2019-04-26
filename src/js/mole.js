import '../styles/mole.css';

export class Mole {
  constructor(el) {
    this.el = el;
    this.isShown = false;
  }

  activate() {
    this.showAfterDelay(true)
  }

  showAfterDelay(onStart = false) {
    this.showInterval = setTimeout(function () {
      clearTimeout(this.showInterval);
      this.show();
      this.hideAfterDelay();
    }.bind(this), getRandomTime(onStart));
  }

  hideAfterDelay() {
    this.hideInterval = setTimeout(function () {
      clearInterval(this.hideInterval);
      this.hide();
      this.showAfterDelay();
    }.bind(this), getRandomTime());
  }

  show() {
    this.isShown = true;
    this.el.setAttribute('aria-hidden', 'false');
  }

  hide() {
    this.isShown = false;
    this.el.setAttribute('aria-hidden', 'true');
  }

  stop() {
    clearTimeout(this.showInterval);
    clearTimeout(this.hideInterval);
  }

  reset() {
    this.stop();
    this.hide();
  }
}

function getRandomTime(onStart) {
  // Return a random time between 1 (0 on start) and 3 seconds
  return (Math.random() * 3000) + (onStart ? 0 : 1000);
}
