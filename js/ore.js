var ores = [];

var oreTypes = [
  { "name": "coal", "color": [100, 100, 100], "value": 1, "rarity": 5, "requiredLevel": 1 },
  { "name": "iron", "color": [181, 91, 37], "value": 1, "rarity": 10, "requiredLevel": 2 },
  { "name": "gold", "color": [255, 255, 152], "value": 1, "rarity": 20, "requiredLevel": 3 }
];

function createOre(p,t) {
  ores.push(new Ore);
  ores[ores.length-1].pos = p;
  ores[ores.length-1].oreType = t;
}

function pickOre() {
  var o;
  var oreMatchLevel = false; oreMatchRarity = false;
  var r;
  o = oreTypes[floor(random(0, oreTypes.length))];
  if (numberOfAsteroids >= o.requiredLevel) {
    oreMatchLevel = true;
  }
  r = getRandomInt(0, o.rarity)+1;
  console.log(r,o.rarity);
  if ( r == o.rarity ) {
    oreMatchRarity = true;
  }
  if (oreMatchLevel && oreMatchRarity) {
    console.log(o);
    return o;
  } else {
    return false;
  }
}

function Ore(pos) {
  this.oreType;
  if (pos) { this.pos = pos.copy(); } else { this.pos = createVector(random(width), random(height)); }
  this.r = random(3, 5);
  this.vel = p5.Vector.random2D();
  this.heading = 0 ;
  this.rotationSpeed = random(.01,.05) ;
  this.rotationDir = random(-1,1);
  this.total = 5; //floor(random(3, 5));
  this.offset = [];
  this.grav = p5.Vector(.01,.01,0);
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.heading += this.rotationSpeed * this.rotationDir;
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

  this.render = function() {
    push();
    stroke(this.oreType["color"]);
    fill(this.oreType["color"]);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

}
