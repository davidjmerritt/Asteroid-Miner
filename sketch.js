var ship;
var controller;
var powers = [];
var energy = [];
var asteroids = [];
var lasers = [];
var menu;
var gameStarted = false;
var gameWin = false;
var score = 0;
var numberOfAsteroids = 0;
var laserSize = 4;
var chancePower = 5;
var chanceEnergy = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  // controller = new Controller();

  button = createButton('LEFT');
  button.position(50, height-100);
  button.mousePressed(function(){ship.setRotation(-0.1);});

  button = createButton('RIGHT');
  button.position(125, height-100);
  button.mousePressed(function(){ship.setRotation(0.1);});

  button = createButton('FIRE');
  button.position(width-175, height-100);
  button.mousePressed(function(){lasers.push(new Laser(ship.pos, ship.heading, laserSize));});

  button = createButton('BOOST');
  button.position(width-100, height-100);
  button.mousePressed(function(){ship.boosting(true);});

  button = createButton('START');
  button.position(width/2-25, height-100);
  button.mousePressed(function(){
    numberOfAsteroids += 1;
    gameStarted = true;
    ship.isAlive = true;
    reset();
  });

  reset();
}

function reset() {
  energy = [];
  powers = [];
  asteroids = [];
  lasers = [];
  laserSize = 4;
  menu = new Menu();
  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid());
  }


  if (int(random(0,chancePower)) == 0) {
    for (var i = 0; i < 1; i++) {
      powers.push(new Power());
    }
  }
  if (int(random(0,chanceEnergy)) == 0) {
    for (var i = 0; i < 1; i++) {
      energy.push(new Energy());
    }
  }
  console.log(chanceEnergy,chancePower);
}

function draw() {
  background(0);
  menu.render();

  if (gameStarted == false) {
    menu.gameStart();
  } else {
    if (ship.isAlive) {
      //menu.gamePlay();
      for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
          background(255,0,0);
          ship.explode();
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
      }

      for (var i = 0; i < energy.length; i++) {
        if (ship.hits(energy[i])) {
          energy.splice(i, 1);
          ship.enhance();
        }
        if (energy.length > 0) {
          energy[i].render();
          energy[i].update();
          energy[i].edges();
        }
      }

      for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        } else {
          for (var j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
              if (asteroids[j].r > 10) {
                var newAsteroids = asteroids[j].breakup();
                asteroids = asteroids.concat(newAsteroids);
              }
              asteroids.splice(j, 1);
              lasers.splice(i, 1);
              score += 1;
              break;
            }
          }
        }
      }

      for (var i = 0; i < powers.length; i++) {
        powers[i].render();
        powers[i].update();
        powers[i].edges();
        if (ship.hits(powers[i])) {
          powers.splice(i, 1);
          laserSize += 20;
        }
      }

      ship.render();
      ship.turn();
      ship.update();
      ship.edges();

      menu.gameScore('Level '+numberOfAsteroids+' | Score '+score);

      if (asteroids.length <= 0) {
        // menu.gameWin();
        numberOfAsteroids += 1;
        reset();
        // var t = setTimeout(function(){
        //   clearTimeout(t);
        // },3000);

        // gameStarted = true;
        ship.isAlive = true;

      }

    } else {
      menu.gameOver('Level '+numberOfAsteroids+' | Score '+score);
      // var t = setTimeout(function(){
      //   // gameStarted = false;
      //   numberOfAsteroids = 0;
      //   gameStarted = false;
      //   ship.isAlive = false;
      //   reset();
      //   clearTimeout(t);
      // },3000);
    }
  }
}

function mouseReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ' && gameStarted == false) {
    numberOfAsteroids += 1;
    gameStarted = true;
    ship.isAlive = true;
    reset();
  } else if (key == ' ' && gameStarted == true) {
    lasers.push(new Laser(ship.pos, ship.heading, laserSize));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW || keyCode == '87') {
    ship.boosting(true);
  }
}

// function touchStarted() {
//   console.log(true);
//   return true;
// }
