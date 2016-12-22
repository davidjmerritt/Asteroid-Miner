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
var laserRange = 20;
var chancePower = 5;
var chanceEnergy = 2;
var chanceRange = 2;
var restarted = true;
var paused = false;

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  // controller = new Controller();

  if (supportedMobileDevice) {
    button = createButton('LEFT');
    button.position(50, height-125);
    button.mousePressed(function(){ship.setRotation(-0.1);});

    button = createButton('RIGHT');
    button.position(140, height-125);
    button.mousePressed(function(){ship.setRotation(0.1);});

    button = createButton('FIRE');
    button.position(width-215, height-125);
    button.mousePressed(function(){lasers.push(new Laser(ship.pos, ship.heading, laserSize));});

    button = createButton('BOOST');
    button.position(width-125, height-125);
    button.mousePressed(function(){ship.boosting(true);});

    button = createButton('START');
    button.position(width/2-25, height-100);
    button.mousePressed(function(){
      if (gameStarted) {
        if (paused == true) { paused = false; } else { paused = true; }
      } else {
        numberOfAsteroids += 1;
        gameStarted = true;
        ship.isAlive = true;
        restarted = true;
        reset();
      }
    });
  }
  reset();
}

function reset() {
  if (restarted == true) { numberOfAsteroids = 1; score = 0; }
  energyUp = [];
  energyDown = [];
  powers = [];
  rangeUp = [];
  rangeDown = [];
  asteroids = [];
  lasers = [];
  laserRange = 20;
  laserSize = 4;
  menu = new Menu();
  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid());
  }

  if (int(random(0,chancePower)) == 0) {
    for (var i = 0; i < 1; i++) {
      powers.push(new Powerup());
      powers[i].t = "P";
    }
  }
  if (int(random(0,chanceEnergy)) == 0) {
    for (var i = 0; i < 1; i++) {
      energyUp.push(new Powerup());
      energyUp[i].t = "E";
    }
  }
  if (int(random(0,chanceEnergy)) == 0) {
    for (var i = 0; i < 1; i++) {
      energyDown.push(new Powerup());
      energyDown[i].t = "e";
    }
  }
  if (int(random(0,chanceRange)) == 0) {
    for (var i = 0; i < 1; i++) {
      rangeUp.push(new Powerup());
      rangeUp[i].t = "R";
    }
  }
  if (int(random(0,chanceRange)) == 0) {
    for (var i = 0; i < 1; i++) {
      rangeDown.push(new Powerup());
      rangeDown[i].t = "r";
    }
  }

}

function draw() {
  background(0);
  menu.render();

  if (supportedMobileDevice == true || supportedBrowser == true) {
    // console.log(supportedMobileDevice,supportedBrowser);
    if (paused) { menu.gameScore('Paused'); } else {
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

          for (var i = 0; i < energyUp.length; i++) {
            if (ship.hits(energyUp[i])) {
              energyUp.splice(i, 1);
              ship.enhance();
            }
            if (energyUp.length > 0) {
              energyUp[i].render();
              energyUp[i].update();
              energyUp[i].edges();
            }
          }
          for (var i = 0; i < energyDown.length; i++) {
            if (ship.hits(energyDown[i])) {
              energyDown.splice(i, 1);
              ship.weaken();
            }
            if (energyDown.length > 0) {
              energyDown[i].render();
              energyDown[i].update();
              energyDown[i].edges();
            }
          }

          for (var i = 0; i < rangeUp.length; i++) {
            if (ship.hits(rangeUp[i])) {
              rangeUp.splice(i, 1);
              laserRange += 10;
            }
            if (rangeUp.length > 0) {
              rangeUp[i].render();
              rangeUp[i].update();
              rangeUp[i].edges();
            }
          }

          for (var i = 0; i < rangeDown.length; i++) {
            if (ship.hits(rangeDown[i])) {
              rangeDown.splice(i, 1);
              laserRange -= 10;
              if (laserRange < 20) {
                laserRange = 10;
              }
            }
            if (rangeDown.length > 0) {
              rangeDown[i].render();
              rangeDown[i].update();
              rangeDown[i].edges();
            }
          }

          for (var i = lasers.length - 1; i >= 0; i--) {
            lasers[i].render();
            lasers[i].update();
            if (lasers[i].dist > laserRange) {
              lasers.splice(i, 1);
            } else if (lasers[i].offscreen()) {
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
            restarted = false;
            reset();
            // var t = setTimeout(function(){
            //   clearTimeout(t);
            // },3000);


            ship.isAlive = true;

          }

        } else {
          menu.gameOver('Level '+numberOfAsteroids+' | Score '+score);
          gameStarted = false;
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
  } else {
      menu = new Menu();
      menu.unSupportedDevice();
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
    restarted = true;
    reset();
  } else if (key == ' ' && gameStarted == true) {
    console.log(gameStarted);
    lasers.push(new Laser(ship.pos, ship.heading, laserSize));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW || keyCode == '87') {
    ship.boosting(true);
  } else if (keyCode == DOWN_ARROW) {
    if (gameStarted) {
      if (paused) { paused = false; } else { paused = true; }
    }
  }
}

// function touchStarted() {
//   console.log(true);
//   return true;
// }
