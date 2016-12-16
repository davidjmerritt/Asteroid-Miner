function Menu() {
  this.message = "Asteroids"
  this.fontFace = "Courier"
  this.col = (255,255,255);

  this.gameStart = function() {
    this.message = "Asteroids\n\nSPACEBAR = FIRE\nARROW-UP = BOOST\nARROW-LEFT = ROTATE LEFT\nARROW-RIGHT = ROTATE RIGHT";
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
    var y2 = size*10;
    var y1 = (height/2) - (y2 / 2);
    textAlign(CENTER);
    textFont(this.fontFace,size);
    text(this.message, x1, y1, x2, y2);
    pop();
  }

}
