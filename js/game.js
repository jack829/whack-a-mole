(function() {
  window.Game = function Game() {
    this.moles = [];
    this.score = 0;
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.gameBoard = document.getElementById('gameBoard');
    this.startButton = document.getElementById('startGame');
    this.stopButton = document.getElementById('stopGame');
    this.resetButton = document.getElementById('resetGame');

    this.gameBoard.addEventListener('click', this.onAttemptedHit.bind(this));
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
    this.score = 0;
    this.renderScore(this.score);
  }

  Game.prototype.onAttemptedHit = function (e) {
    const current = e.target;
    const isMole = current.classList.contains('js-Mole');
    if (isMole) {
      this.score++;
      this.renderScore(this.score);
    }
  }

  Game.prototype.renderScore = function () {
    this.scoreDisplay.textContent = this.score;
  }

  function getMolesFromDOM() {
    return Array.prototype.slice.call(document.getElementsByClassName('js-Mole')).map(function (el) {
      return new Mole(el);
    });
  }
})();
