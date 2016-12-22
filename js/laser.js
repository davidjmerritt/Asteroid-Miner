function Laser(spos, angle, lSize) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.lSize = lSize;
  this.vel.mult(10);
  this.col = (255,255,255);
  this.dist = 0;

  this.update = function() {
    this.dist += 1;
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(this.col);
    strokeWeight(this.lSize);
    ellipse(this.pos.x, this.pos.y, this.lSize);
    translate(this.lSize,0);
    // point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    var d = dist(float(this.pos.x), float(this.pos.y), float(asteroid.pos.x), float(asteroid.pos.y));
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}
