function Menu() {
  this.message = "Asteroids"
  this.fontFace = "Courier"
  this.col = (255,255,255);

  this.unSupportedDevice = function() {
    this.message = "You are currently using an unsupported device.  Try on an iPad Mini or Desktop.";
  }
  this.gameStart = function() {
    this.message = "ASTEROID MINER\n\nSPACEBAR = FIRE/START\nARROW-UP,W = BOOST\nARROW-DOWN,V = PAUSE\nARROW-LEFT = ROTATE LEFT\nARROW-RIGHT = ROTATE RIGHT\n\nBREAK ASTEROID = 1 POINT\nCOLLECT COAL = 5 POINTS\nCOLLECT IRON = 10 POINTS\nCOLLECT GOLD = 20 POINTS\nCOLLECT E/e = INCREASE/DECREASE SHIELDS\nCOLLECT T/t = CHANGE/REMOVE RANDOM LASER TYPE (NORMAL, BACK-FIRE, SPREAD)\nCOLLECT R/r = TEMPORARILY INCREASE/DECREASE LASER RANGE\nCOLLECT P/p = INCREASE/DECREASE LASER SIZE";
  }

  this.gamePlay = function() {
    this.message = "";
  }

  this.gameOver = function(score) {
    this.message = "GAME OVER MAN!!! GAME OVER!!!\n\nPRESS ANY KEY TO START OVER.";
  }

  this.gameScore = function(score) {
    this.message = score;
  }

  this.gameWin = function(score) {
    this.message = "You Win!";
  }

  this.render = function() {
    push();
    fill(this.col);
    var size = 22
    var x2 = 800;
    var x1 = (width/2) - (x2 / 2);
    var y2 = 500;
    var y1 = (height/2) - (y2 / 2);
    textAlign(CENTER);
    textFont(this.fontFace,size);
    text(this.message, x1, y1, x2, y2);
    pop();
  }
}
