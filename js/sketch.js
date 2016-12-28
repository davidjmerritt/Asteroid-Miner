var ship;
var controller;
var powers = [];
var energy = [];
var type = [];
var asteroids = [];
var dust = [];
var lasers = [];
var menu;
var gameStarted = false;
var gameWin = false;
var score = 0;
var numberOfAsteroids = 1;
var laserSize;
var laserSizeStart = 4;
var laserSizeInc = 10;
var laserRange;
var laserRangeMin = 5;
var laserRangeStart = 10;
var laserRangeInc = 30;
var chancePower = 5;
var chanceEnergy = 2;
var chanceType = 2;
var chanceRange = 2;
var restarted = true;
var paused = false;
var pointTally;
var MEGAMAN = "snd/megaman/";
var CONTRA = "snd/contra/";
var ULTIMA_V = "snd/ultima_v/";
var soundTrackVolume = .25;
var cheatSeq = [];
var backgroundColor = 0;

function preload() {
  soundTrack = loadSound(ULTIMA_V+'villager_tarantella.mp3');

  pointTally = loadSound(MEGAMAN+'point_tally.wav');
  laserNormal = loadSound(MEGAMAN+'enemy_shoot.wav');
  laserDouble = loadSound(MEGAMAN+'enemy_shoot_double.wav');
  laserSpread = loadSound(CONTRA+'spread.wav');
  aquireOre = loadSound(MEGAMAN+'1up.wav');
  asteroidExplode = loadSound(MEGAMAN+'explosion.wav');
  grabberOn = loadSound(MEGAMAN+'pipi.wav');
  shipHit = loadSound(MEGAMAN+'damage.wav');
  aquirePowerup = loadSound(MEGAMAN+'bonus.wav');
  losePowerup = loadSound(MEGAMAN+'bonus_r.wav');
  fireJets = loadSound(MEGAMAN+'fire_clip.wav');
  pauseSound = loadSound(MEGAMAN+'pause.wav');
  gameOverSound = loadSound(MEGAMAN+'defeat.wav');
}


function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  tail = new Tail();
  grabber = new Grabber();

  if (supportedMobileDevice) {
    button = createButton('LEFT');
    button.position(50, height-125);
    button.mousePressed(function(){ship.setRotation(-0.1);});

    button = createButton('RIGHT');
    button.position(140, height-125);
    button.mousePressed(function(){ship.setRotation(0.1);});

    button = createButton('FIRE');
    button.position(width-215, height-125);
    button.mousePressed(function(){ fireLasers(); });

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
  if (restarted == true) {
    numberOfAsteroids = 1;
    score = 0;
    ores = [];
    shields = [];
    numberOfShields = 3;
    laserType = "NORMAL";
    createShields();
    createStats();
    soundTrack.stop();
    soundTrack.setVolume(soundTrackVolume);
    soundTrack.loop();
  }
  energyUp = [];
  energyDown = [];
  typeAdd = [];
  typeRemove = [];
  powers = [];
  rangeUp = [];
  rangeDown = [];
  asteroids = [];
  lasers = [];
  laserRange = laserRangeStart;
  laserSize = laserSizeStart;
  menu = new Menu();
  stats = new Stats();

  if(cheatSeq.compare([37, 39, 37, 39, 219, 221, 86])) {
    console.log('You dirty cheater!');
    cheats();
    cheatSeq = [];
  }

  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid);
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
  if (int(random(0,chanceType)) == 0) {
    for (var i = 0; i < 1; i++) {
      typeAdd.push(new Powerup());
      typeAdd[i].t = "T";
    }
  }
  if (int(random(0,chanceType)) == 0) {
    for (var i = 0; i < 1; i++) {
      typeRemove.push(new Powerup());
      typeRemove[i].t = "t";
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

// DRAW
function draw() {
  background(backgroundColor);
  menu.render();

  if (supportedMobileDevice == true || supportedBrowser == true) {
    // console.log(supportedMobileDevice,supportedBrowser);
    if (paused) {
      menu.gameScore('Paused');
      soundTrack.setVolume(0);
    } else {
      if (gameStarted == false) {
        menu.gameStart();
        soundTrack.setVolume(0);
      } else {
        soundTrack.setVolume(soundTrackVolume);
        if (ship.isAlive) {
          //menu.gamePlay();
          for (var i = 0; i < asteroids.length; i++) {
            if (ship.hits(asteroids[i])) {
              background(255,0,0);
              shields.splice(0,1);
              ship.explode();
              shipHit.play();
            }
            asteroids[i].render();
            asteroids[i].update();
            asteroids[i].edges();
          }

          for (var i = 0; i < ores.length; i++) {
            if (grabber.hits(ores[i])) {
              oreBurn[i] += 1;
              grabber.strokeColor = [155+oreBurn[i],155,255-oreBurn[i]];
              // ores[i].burning(true);
              console.log(oreBurn[i]);
              if (oreBurn[i] > ores[i].oreType.durability) {
                var dustVel = p5.Vector.add(grabber.vel.mult(0.2), ores[i].vel);
                var dustNum = ores[i].r*100;
                addDust(ores[i].pos, dustVel, dustNum);

                score += ores[i].oreType.rarity;
                oresCollected[ores[i].oreType.name] += round(ores[i].r);
                ores.splice(i, 1);
                oreBurn[i] = 0;
                // pointTally.setVolume(0.5);
                aquireOre.play();
                break;
              }
            } else {
              // ores[i].burning(false);
              oreBurn[i] = 0;
            }
            ores[i].render();
            ores[i].update();
            ores[i].edges();

            ores[i].r -= ores[i].oreType.rate_of_decay;
            if (ores[i].r < 1) {
              ores.splice(i, 1);
            }
          }

          // for (var i = 0; i < oreScore.length; i++) {
          //   oreScore[i].render();
          //   // console.log(i);
          // }

          for (var i = 0; i < energyUp.length; i++) {
            if (ship.hits(energyUp[i])) {
              aquirePowerup.play();
              energyUp.splice(i, 1);
              addShield();
              // ship.enhance();
            }
            if (energyUp.length > 0) {
              energyUp[i].render();
              energyUp[i].update();
              energyUp[i].edges();
            }
          }
          for (var i = 0; i < energyDown.length; i++) {
            if (ship.hits(energyDown[i])) {
              losePowerup.play();
              energyDown.splice(i, 1);
              // ship.weaken();
              shields.splice(0, 1);
            }
            if (energyDown.length > 0) {
              energyDown[i].render();
              energyDown[i].update();
              energyDown[i].edges();
            }
          }

          for (var i = 0; i < typeAdd.length; i++) {
            if (ship.hits(typeAdd[i])) {
              aquirePowerup.play();
              typeAdd.splice(i, 1);
              laserType = randomLaserType();
            }
            if (typeAdd.length > 0) {
              typeAdd[i].render();
              typeAdd[i].update();
              typeAdd[i].edges();
            }
          }

          for (var i = 0; i < typeRemove.length; i++) {
            if (ship.hits(typeRemove[i])) {
              losePowerup.play();
              typeRemove.splice(i, 1);
              laserType = "NORMAL";
            }
            if (typeRemove.length > 0) {
              typeRemove[i].render();
              typeRemove[i].update();
              typeRemove[i].edges();
            }
          }

          for (var i = 0; i < rangeUp.length; i++) {
            if (ship.hits(rangeUp[i])) {
              aquirePowerup.play();
              rangeUp.splice(i, 1);
              laserRange += laserRangeInc;
            }
            if (rangeUp.length > 0) {
              rangeUp[i].render();
              rangeUp[i].update();
              rangeUp[i].edges();
            }
          }

          for (var i = 0; i < rangeDown.length; i++) {
            if (ship.hits(rangeDown[i])) {
              losePowerup.play();
              rangeDown.splice(i, 1);
              laserRange -= laserRangeInc;
              if (laserRange < laserRangeMin) {
                laserRange = laserRangeMin;
              }
            }
            if (rangeDown.length > 0) {
              rangeDown[i].render();
              rangeDown[i].update();
              rangeDown[i].edges();
            }
          }

          // BREAK UP ASTEROIDS
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
                  asteroidExplode.play();
                  if (asteroids[j].r > 10) {
                    var newAsteroids = asteroids[j].breakup();
                    asteroids = asteroids.concat(newAsteroids);
                    var newOre = pickOre();
                    if (newOre != false) {
                      createOre(asteroids[j].pos,newOre);
                    }
                  }

                  var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
                  var dustNum = asteroids[j].r;
                  addDust(asteroids[j].pos, dustVel, dustNum);

                  asteroids.splice(j, 1);
                  lasers.splice(i, 1);
                  score += 1;
                  oresCollected["asteroid"] += 1
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
              laserSize += laserSizeInc;
            }
          }

          tail.render();
          tail.update();

          ship.render();
          ship.turn();
          ship.update();
          ship.edges();

          grabber.render();
          grabber.update();

          for (var i = shields.length - 1; i >= 0; i--) {
            shields[i].render();
            shields[i].pos = ship.pos;
            shields[i].heading = ship.heading;
            shields[i].r = (ship.r * i)+shieldPadding;
          }
          menu.gameScore('');
          // menu.gameScore('Level '+numberOfAsteroids+' | Score '+score);

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

          for (var i = dust.length - 1; i >= 0; i--) {
            dust[i].update();
            if (dust[i].transparency <= 0) {
              dust.splice(i, 1);
            }
          }

          for (var i = dust.length - 1; i >= 0; i--) {
            dust[i].render();
          }

        } else {
          menu.gameOver();
          soundTrack.stop();
        }
      }
    }
  } else {
      menu = new Menu();
      menu.unSupportedDevice();
    }

    showStats();
}

function mouseReleased() {
    ship.setRotation(0);
    ship.boosting(false);
    fireJets.stop();
}

function keyReleased() {
  if (keyCode == 219) {
    grabber.grabbing(false);
  } else {
    ship.setRotation(0);
    ship.boosting(false);
    fireJets.stop();
  }
}

function keyPressed() {
  if (ship.isAlive == true) {
    if (gameStarted == false) {
      cheatSeq.push(keyCode);
      if (cheatSeq.length > 7) {
        cheatSeq = [];
      }
      console.log(cheatSeq);
    }
    if (key == ' ' && gameStarted == false || keyCode == 86 && gameStarted == false) { // space or v
      numberOfAsteroids += 1;
      gameStarted = true;
      ship.isAlive = true;
      restarted = true;
      reset();
    } else if (key == ' ' && gameStarted == true || keyCode == 221 && gameStarted == true) { // space or ]
      fireLasers();
    } else if (keyCode == 219) { // [
      grabber.grabbing(true);
    } else if (keyCode == RIGHT_ARROW) {
      ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
      ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW || keyCode == '87') { // w
      ship.boosting(true);
      fireJets.loop();
    } else if (keyCode == DOWN_ARROW) {
      ship.boosting(true);
      fireJets.loop();
    } else if (keyCode == 86) { // v
      if (gameStarted) {
        if (paused) { paused = false; } else { paused = true; }
      }
    } else if (keyCode == 70) { // f
      var fs = fullscreen();
      fullscreen(!fs);
    } else if (keyCode == 82) { // r
      console.log('r');
      location.reload();
    }
  } else {
    location.reload();
  }
}

function cheats() {
  numberOfAsteroids = 10;
  laserRange = 100;
  laserSize = 20;
  laserType = 'SPREAD'
  backgroundColor = [0,0,30];
}

// function touchStarted() {
//   console.log(true);
//   return true;
// }
