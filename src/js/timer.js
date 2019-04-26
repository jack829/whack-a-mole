(function() {
  window.Timer = function Timer(callback, delay, displayCallback) {
    this.timeoutId = null;
    this.displayIntervalId = null;
    this.delay = delay;
    this.remaining = delay;
    this.startTime = null;
    this.callback = callback;
    this.displayCallback = displayCallback;
  }

  Timer.prototype.start = function () {
    this.startTime = Date.now();
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.callback, this.remaining);
    if (this.displayCallback) {
      clearTimeout(this.displayIntervalId)
      this.displayIntervalId = setInterval(this.displayCallback, 1000)
    }
  }

  Timer.prototype.stop = function () {
    clearTimeout(this.timeoutId);
    clearInterval(this.displayIntervalId);
    this.remaining -= Date.now() - this.startTime;
  }

  Timer.prototype.reset = function () {
    clearTimeout(this.timeoutId);
    clearInterval(this.displayIntervalId);
    this.remaining = this.delay;
  }
})();
