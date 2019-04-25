(function() {
  window.Game = function Game() {
    this.moles = [];
    this.startButton = document.getElementById('startGame');
    this.stopButton = document.getElementById('stopGame');
    this.resetButton = document.getElementById('resetGame');

    this.startButton.addEventListener('click', this.start.bind(this));
    this.stopButton.addEventListener('click', this.stop.bind(this));
    this.resetButton.addEventListener('click', this.reset.bind(this));
  }

  Game.prototype.start = function () {
    this.moles = getMolesFromDOM();
    this.moles.forEach(function (mole) {
      mole.activate();
    });
    this.startButton.setAttribute('disabled', 'disabled');
    this.stopButton.removeAttribute('disabled');
    this.resetButton.removeAttribute('disabled');
  }

  Game.prototype.stop = function () {
    this.moles.forEach(function (mole) {
      mole.stop();
    });
    this.startButton.removeAttribute('disabled');
    this.stopButton.setAttribute('disabled', 'disabled');
  }

  Game.prototype.reset = function () {
    this.moles.forEach(function (mole) {
      mole.reset();
    });
  }


  function getMolesFromDOM() {
    return Array.prototype.slice.call(document.getElementsByClassName('js-Mole')).map(function (el) {
      return new Mole(el);
    });
  }
})();
