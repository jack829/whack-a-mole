(function() {
  const GAME_TIME = 60 * 1000;

  window.Game = function Game() {
    this.moles = [];
    this.score = 0;
    this.inProgress = false;
    this.timeRemaining = GAME_TIME / 1000;
    // Add an extra second for the GAME_TIME passed into the timer so that we will reach 0 in the countdown.
    this.timer = new Timer(this.reset.bind(this), GAME_TIME + 1000, this.countdown.bind(this));

    this.timeDisplay = document.getElementById('timeDisplay')
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.finalScoreGroupEl = document.getElementById('finalScoreSection')
    this.finalScoreEl = document.getElementById('finalScore');
    this.gameBoard = document.getElementById('gameBoard');
    this.startButton = document.getElementById('startGame');
    this.stopButton = document.getElementById('stopGame');
    this.resetButton = document.getElementById('resetGame');

    this.gameBoard.addEventListener('click', this.onAttemptedHit.bind(this));
    this.startButton.addEventListener('click', this.start.bind(this));
    this.stopButton.addEventListener('click', this.stop.bind(this));
    this.resetButton.addEventListener('click', this.reset.bind(this));

    this.countdown(true);
  }

  Game.prototype.start = function () {
    this.inProgress = true;
    this.moles = getMolesFromDOM();
    this.moles.forEach(function (mole) {
      mole.activate();
    });
    this.timer.start();
    this.startButton.setAttribute('disabled', 'disabled');
    this.stopButton.removeAttribute('disabled');
    this.resetButton.removeAttribute('disabled');
  }

  Game.prototype.stop = function () {
    this.inProgress = false;
    this.moles.forEach(function (mole) {
      mole.stop();
    });
    this.timer.stop();
    this.startButton.removeAttribute('disabled');
    this.stopButton.setAttribute('disabled', 'disabled');
  }

  Game.prototype.reset = function () {
    this.inProgress = false;
    this.moles.forEach(function (mole) {
      mole.reset();
    });
    this.score = 0;
    this.timeRemaining = GAME_TIME / 1000;
    this.timer.stop();
    this.countdown(true);
    this.renderScore(this.score);
  }

  Game.prototype.gameOver = function () {
    this.finalScoreEl.textContent = this.score;
    this.finalScoreGroupEl.removeAttribute('aria-hidden')
    this.reset();
  }

  Game.prototype.onAttemptedHit = function (e) {
    if (!this.inProgress) return;
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

  Game.prototype.countdown = function (reset) {
    if (!reset) this.timeRemaining--;
    if (this.timeRemaining === 0) return this.gameOver();
    this.timeDisplay.textContent = this.timeRemaining;
  }

  function getMolesFromDOM() {
    return Array.prototype.slice.call(document.getElementsByClassName('js-Mole')).map(function (el) {
      return new Mole(el);
    });
  }
})();
