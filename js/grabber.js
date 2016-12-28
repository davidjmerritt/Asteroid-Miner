function Grabber(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height))
  }
  this.strokeColor = "white"//color(255,255,0,0);
  this.fillColor = color(255,255,255,100);
  this.vel = p5.Vector.random2D();
  this.heading = 0 ;
  this.rotationSpeed = .5 ;
  this.total = 50;
  this.xOffset = 0;
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }
  isGrabbing = false;

  this.grabbing = function(g) {
    if (g) {
      this.isGrabbing = true;
      grabberOn.loop();
    } else {
      this.isGrabbing = false;
      grabberOn.stop();
    }
  }

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < (this.r + entity.r) + this.xOffset ) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (this.isGrabbing) {
      this.pos = ship.pos;
      this.strokeColor = [155,155,155];
    } else {
      this.pos = createVector(99999, 99999);
    }
    this.heading = ship.heading;
    this.r = ship.r*10;
    this.xOffset = 0;
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * .001, this.r * .05);
    }
    // this.pos.add(this.vel);
    // this.heading += this.rotationSpeed * this.rotationDir;
  }

  this.render = function() {
    push();
    stroke(this.strokeColor);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(alpha(this.fillColor));
    noFill();
    // beginShape();
    // vertex(0, 20);
    // vertex(50, 50);
    // vertex(80, 50);
    // vertex(80, -50);
    // vertex(50, -50);
    // vertex(0, -20);
    // endShape();
    // ellipse(0, 0, this.r * 10);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
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
