let Engine = (function(global) {

  let doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime,
    node = doc.createElement("P"),
    node2 = doc.createElement("P"),
    node3 = doc.createElement("P"),
    node4 = doc.createElement("P"),
    textnode = doc.createTextNode("Conquer your fear and get to the water!");

  canvas.width = 505;
  canvas.height = 606;

  node.appendChild(textnode);
  doc.body.appendChild(node);
  doc.body.appendChild(node2);
  doc.body.appendChild(canvas);
  doc.body.appendChild(node3);
  doc.getElementsByTagName("p")[1].innerHTML = `Courage:  <span class = "counter-background">${player.courage}</span>`;
  doc.body.appendChild(node4);

  function main() {

    let promptNew = () => {
      doc.getElementsByTagName("p")[3].innerHTML = "PRESS <span class ='brick'>ENTER</span> TO START NEW GAME";
    };
    let now = Date.now(),
      dt = (now - lastTime) / 1000.0;
    //player object signalled defeat or victory - stop player input and communicate status
    if (player.defeat) {
      doc.getElementsByTagName("p")[2].innerHTML = "YOU HAVE LOST!";
      player.keyinputOn = false;
      promptNew();
    } else if (player.victory) {
      doc.getElementsByTagName("p")[2].innerHTML = "YOU HAVE WON!<br>CONGRATULATIONS!";
      player.keyinputOn = false;
      promptNew();
    }

    update(dt);
    render();
    lastTime = now;
    win.requestAnimationFrame(main);
  }

  function init() {
    lastTime = Date.now();
    main();
  }
  function update(dt) {
    updateEntities(dt);
  }
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  function render() {

    let rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 3 of stone
        'images/stone-block.png', // Row 2 of 3 of stone
        'images/stone-block.png', // Row 3 of 3 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
        'images/grass-block.png' // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    renderEntities();
  }
  function renderEntities() {
    allPoo.forEach(function(poo) {
      poo.render();
    });
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/poo.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
