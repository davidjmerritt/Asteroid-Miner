function Bomb(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height))
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = 15;
  }
  this.col = 0;
  this.vel = p5.Vector.random2D();
  this.heading = 0 ;
  this.rotationSpeed = .5 ;
  this.rotationDir = 1;
  this.total = 100;
  this.xOffset = -5;
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function() {
    this.pos = ship.pos;
    this.heading = ship.heading;
    this.r = ship.r*shields.length-1;
    this.xOffset = -15*shields.length;
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 1, this.r * 1);
    }
    // this.pos.add(this.vel);
    // this.heading += this.rotationSpeed * this.rotationDir;
  }

  this.render = function() {
    push();
    stroke(this.col);
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    //ellipse(0, 0, this.r * 2);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle)*20;
      var y = r * sin(angle)*20;
      vertex(x+this.xOffset, y);
    }
    endShape(CLOSE);
    pop();
  }

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

}
