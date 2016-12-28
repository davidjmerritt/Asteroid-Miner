
// MAIN CLASS
function Shield() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 0;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.col = "white";

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    stroke(this.col);
    strokeWeight(1);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }
}

// VARS
var shields = [];
var numberOfShields;
var shieldPadding = 12;

// GLOBAL FUNCTIONS
function createShields() {
  for (var i = 0; i < numberOfShields; i++) {
    addShield();
  }
}

function addShield() {
  shields.push(new Shield);
}
