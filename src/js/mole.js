import '../styles/mole.css';

function getRandomTime(onStart) {
  // Return a random time between 1 (0 on start) and 3 seconds
  return (Math.random() * 3000) + (onStart ? 0 : 1000);
}

export class Mole {
  constructor(el) {
    this.el = el;
    this.isShown = false;
  }

  _showAfterDelay(onStart = false) {
    this.showInterval = setTimeout(() => {
      clearTimeout(this.showInterval);
      this.show();
      this._hideAfterDelay();
    }, getRandomTime(onStart));
  }

  _hideAfterDelay() {
    this.hideInterval = setTimeout(() => {
      clearInterval(this.hideInterval);
      this._hide();
      this._showAfterDelay();
    }, getRandomTime());
  }

  show() {
    this.isShown = true;
    this.el.setAttribute('aria-hidden', 'false');
  }

  _hide() {
    this.isShown = false;
    this.el.setAttribute('aria-hidden', 'true');
  }

  activate() {
    this._showAfterDelay(true);
  }

  stop() {
    clearTimeout(this.showInterval);
    clearTimeout(this.hideInterval);
  }

  reset() {
    this.stop();
    this._hide();
  }
}
