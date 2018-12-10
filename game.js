class Game {

  constructor(options) {
    this.snake = options.snake;
    this.food = undefined;
    this.rows = options.rows;
    this.columns = options.columns;
    this.ctx = options.ctx;
    this.updatePointsCB = undefined;
    this.points = 0;
  }

  _drawBoard () {
    this.ctx.fillStyle = "#E3D4AB";
    
    this.ctx.fillRect(0,0, this.rows * 10, this.columns * 10);
    if (this.food) {
      this._drawFood();
    }
  }

  _drawSnake () {
    this.snake.body.forEach((position, index) => {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(position.column * 10, position.row * 10, 8, 8);
    });
  }

  start(updatePointsCB) {
    this._assignControlsToKeys();
    this._generateFood();
    this.snake.move();
    this._update();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    this.updatePointsCB = updatePointsCB;
  }


  _assignControlsToKeys () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 38: //arrow up
          this.snake.goUp();
          break;
        case 40: //arror down
          this.snake.goDown();
          break;
        case 37: //arror left
          this.snake.goLeft();
          break;
        case 39: //arrow right
          this.snake.goRight();
          break; 
        case 80: // p pause
          this.snake.intervalId ? this.snake.stop() : this.snake.start()
          break;
      }
    };
  }

  _generateFood () {
    do {
      this.food = {
        row: Math.floor(Math.random() * this.rows),
        column: Math.floor(Math.random() * this.columns),
      };
    } while ( this.snake.collidesWith(this.food) );
  }

  _drawFood () {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.column * 10, this.food.row * 10, 8, 8);
  }

  _update () {
    this.clear();
    this._drawBoard();
    this._drawSnake();
    if ( this.snake.hasEatenFood(this.food) ) {
      this.snake.grow();
      this._generateFood();
      this._drawFood();
      this.points++;
      this.updatePointsCB(this.points);
    }
    if ( this.snake.hasEatenItSelf() ) {
      this.snake.stop();
      this.pause();
      this.onGameOver()
    }
    if (this.intervalGame !== undefined) {
      this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
    // this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
  }

  pause () {
    if (this.intervalGame) {
      window.cancelAnimationFrame(this.intervalGame);
      this.intervalGame = undefined;
    }
  }

}

