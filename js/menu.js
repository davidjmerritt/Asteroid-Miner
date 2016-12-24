function Menu() {
  this.message = "Asteroids"
  this.fontFace = "Courier"
  this.col = (255,255,255);

  this.unSupportedDevice = function() {
    this.message = "You are currently using an unsupported device.  Try on an iPad Mini or Desktop.";
  }
  this.gameStart = function() {
    this.message = "ASTEROID MINER\n\n"
    this.message += "BREAK ASTEROID = 1 POINT\nCOLLECT COAL = 5 POINTS\nCOLLECT IRON = 10 POINTS\nCOLLECT GOLD = 20 POINTS\n\n"
    this.message += "SPACEBAR = FIRE/START\nARROW-UP,W = BOOST\nARROW-DOWN,V = PAUSE\nARROW-LEFT = ROTATE LEFT\nARROW-RIGHT = ROTATE RIGHT\n\n";

  }

  this.gamePlay = function() {
    this.message = "";
  }

  this.gameOver = function(score) {
    this.message = "GAME OVER MAN!!! GAME OVER!!!\n\nFINAL\n"+score;
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
    var size = 24
    var x2 = 600;
    var x1 = (width/2) - (x2 / 2);
    var y2 = size*20;
    var y1 = (height/2) - (y2 / 2);
    textAlign(CENTER);
    textFont(this.fontFace,size);
    text(this.message, x1, y1, x2, y2);
    pop();
  }
}
