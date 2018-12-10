class Snake {
  constructor(maxRows, maxColumns) {
    this.direction = 'right';
    this.body = [
      { row: 1, column: 5 },
      { row: 1, column: 4 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 1, column: 1 },
    ];
    this.intervalId = undefined;
    this.maxRows = maxRows;
    this.maxColumns = maxColumns;
  }
  
  start () {
    this.move();
  }

  move () {
    if (!this.intervalId) {
      this.intervalId = setInterval(this._moveForward.bind(this), 70);
    }
  }

  goUp () {
    if (this.direction === 'left' || this.direction === 'right') {
      this.direction = 'up';
    }
  }

  goDown () {
    if (this.direction === 'left' || this.direction === 'right') {
      this.direction = 'down';
    }
  };

  goLeft () {
    if (this.direction === 'up' || this.direction === 'down') {
      this.direction = 'left';
    }
  };

  goRight () {
    if (this.direction === 'up' || this.direction === 'down') {
      this.direction = 'right';
    }
  };

  _moveForward () {
    var head = this.body[0];
    switch (this.direction) {
      case 'up':
        this.body.unshift({
          row: ( (head.row - 1) + this.maxRows ) % this.maxRows,
          column: head.column,
        })
        break;
      case 'down':
        this.body.unshift({
          row: (head.row + 1) % this.maxRows,
          column: head.column,
        })
        break;
      case 'left':
        this.body.unshift({
          row: head.row,
          column: ( (head.column - 1) + this.maxColumns) % this.maxColumns,
        })
        break;
      case 'right':
        this.body.unshift({
          row: head.row,
          column: (head.column + 1) % this.maxColumns,
        });
        break;
    }
    this.previousTail = this.body.pop();
  }

  grow () {
    if(this.previousTail) {
      this.body.push(this.previousTail);
      this.previousTail = undefined;
    }
  }


  collidesWith (position) {
    return this.body.some(bodyPiece => {
      return bodyPiece.row === position.row && bodyPiece.column === position.column;
    });
  };

  hasEatenItSelf () {
    return this.body.some((element, index, array) => {
      return (element.row === array[0].row && element.column === array[0].column && index != 0);
    });
  };

  hasEatenFood ( food ) {
    return this.body[0].row === food.row && this.body[0].column === food.column;
  }

  stop () {
    if ( this.intervalId ) {
      clearInterval(this.intervalId)
      this.intervalId = undefined;
    }
  }  
  
}

