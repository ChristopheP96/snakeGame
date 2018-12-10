document.onload = function() {
  const canvas = document.getElementById('snake');
  const ctx = canvas.getContext('2d');
  const widthCell = 10;
  const height = 10;

  const game = new Game({
    rows: canvas.width / 10,
    columns: canvas.height / 10,
    snake: new Snake(canvas.width / 10, canvas.height / 10),
    ctx: ctx,
  });

  game.start(() => {
    console.log('yumi!!! 🍎')
  });
}();