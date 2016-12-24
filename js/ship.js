function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.defaultR = 5;
  this.r = this.defaultR;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.isAlive = true;
  this.col = "white";

  this.enhance = function() {
    this.r += 5;
  }

  this.weaken = function() {
    this.r -= 5;
    if (this.r < 5) {
      ship.explode();
    }
  }

  this.explode = function() {
    if (shields.length == 0) {
      if (this.r <= 5) {
        this.r = this.defaultR;
        this.isAlive = false;
      } else {
        this.r -= 5;
      }
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

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < ((this.r * shields.length) + shieldPadding) + entity.r) {
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
