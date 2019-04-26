import { Timer } from './timer';
import { Mole } from './mole';
import '../styles/game.css';

const GAME_TIME_S = 10;
const GAME_TIME_MS = GAME_TIME_S * 1000;

function getMolesFromDOM() {
  const moleEls = Array.prototype.slice.call(document.getElementsByClassName('js-Mole'));
  return moleEls.map((el) => new Mole(el));
}

export class Game {
  constructor() {
    this.moles = [];
    this.score = 0;
    this.inProgress = false;
    this.timeRemaining = GAME_TIME_S;
    // Pass extra second into the timer so that we will reach 0 in the _countdown.
    this.timer = new Timer(this._reset.bind(this), GAME_TIME_MS + 1000, this._countdown.bind(this));

    this.timeDisplay = document.getElementById('timeDisplay');
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.finalScoreGroupEl = document.getElementById('finalScoreSection');
    this.finalScoreEl = document.getElementById('finalScore');
    this.gameBoard = document.getElementById('gameBoard');
    this.startButton = document.getElementById('startGame');
    this.stopButton = document.getElementById('stopGame');
    this.resetButton = document.getElementById('resetGame');

    this.gameBoard.addEventListener('click', this._onAttemptedHit.bind(this));
    this.startButton.addEventListener('click', this.start.bind(this));
    this.stopButton.addEventListener('click', this._stop.bind(this));
    this.resetButton.addEventListener('click', this._reset.bind(this));

    this._countdown(true);
  }

  _stop() {
    this.inProgress = false;
    this.moles.forEach((mole) => mole._stop());
    this.timer._stop();
    this.startButton.removeAttribute('disabled');
    this.stopButton.setAttribute('disabled', 'disabled');
  }

  _reset() {
    this.inProgress = false;
    this.moles.forEach((mole) => mole.reset());
    this.score = 0;
    this.timeRemaining = GAME_TIME_S;
    this.timer._stop();
    this._countdown(true);
    this._renderScore(this.score);
  }

  _gameOver() {
    this.finalScoreEl.textContent = this.score;
    this.finalScoreGroupEl.removeAttribute('aria-hidden');
    this._reset();
  }

  _onAttemptedHit(e) {
    if (!this.inProgress) return;
    const current = e.target;
    const isMole = current.classList.contains('js-Mole');
    if (isMole) {
      this.score++;
      this._renderScore(this.score);
    }
  }

  _renderScore() {
    this.scoreDisplay.textContent = this.score;
  }

  _countdown(_reset) {
    if (!_reset) this.timeRemaining--;
    if (this.timeRemaining === 0) {
      this._gameOver();
      return;
    }
    this.timeDisplay.textContent = this.timeRemaining;
  }

  start() {
    this.inProgress = true;
    this.moles = getMolesFromDOM();
    this.moles.forEach((mole) => mole.activate());
    this.timer.start();
    this.startButton.setAttribute('disabled', 'disabled');
    this.stopButton.removeAttribute('disabled');
    this.resetButton.removeAttribute('disabled');
  }
}
