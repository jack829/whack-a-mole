export function Mole(el) {
  this.el = el;
  this.isShown = false;
}

Mole.prototype.activate = function () {
  this.showAfterDelay(true)
}

Mole.prototype.showAfterDelay = function (onStart) {
  onStart = !!onStart;
  this.showInterval = setTimeout(function () {
    clearTimeout(this.showInterval);
    this.show();
    this.hideAfterDelay();
  }.bind(this), getRandomTime(onStart));
}

Mole.prototype.hideAfterDelay = function () {
  this.hideInterval = setTimeout(function () {
    clearInterval(this.hideInterval);
    this.hide();
    this.showAfterDelay();
  }.bind(this), getRandomTime());
}

Mole.prototype.show = function () {
  this.isShown = true;
  this.el.setAttribute('aria-hidden', 'false');
}

Mole.prototype.hide = function () {
  this.isShown = false;
  this.el.setAttribute('aria-hidden', 'true');
}

Mole.prototype.stop = function () {
  clearTimeout(this.showInterval);
  clearTimeout(this.hideInterval);
}

Mole.prototype.reset = function () {
  this.stop();
  this.hide();
}

function getRandomTime(onStart) {
  // Return a random time between 1 (0 on start) and 3 seconds
  return (Math.random() * 3000) + (onStart ? 0 : 1000);
}
