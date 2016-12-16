function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.defaultR = 10;
  this.r = this.defaultR;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.isAlive = true;
  this.col = (255,255,255);

  this.enhance = function() {
    this.r += 5;
  }

  this.explode = function() {
      if (this.r <= 5) {
        this.r = this.defaultR;
        this.isAlive = false;
      } else {
        this.r -= 5;
    }
    this.pos = createVector(width / 2, height / 2);
    this.heading = 0;
    this.rotation = 0;
  }

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(this.col);
    stroke(this.col);
    // beginShape();
    // for (var i = 0; i < 7; i++) {
    //   var angle = map(i, 0, 7, 0, TWO_PI);
    //   var r = 10
    //   var x = r * cos(angle);
    //   var y = r * sin(angle);
    //   vertex(x, y);
    // }
    // endShape(CLOSE);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
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

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}
