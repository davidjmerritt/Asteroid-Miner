var ores = [];
var oreBurn = {};
var oreTypes = [
  { "_id": 0, "name": "asteroid", "color": [0, 0, 0], "stroke": [255, 255, 255], "value": 0, "rate_of_decay":9999999999, "durability":1, "rarity": 9999999999, "requiredLevel": 999999 },
  { "_id": 1, "name": "coal", "color": [45, 45, 45], "stroke": [65, 65, 65], "value": 50, "rate_of_decay":.001, "durability":50, "rarity": 5, "requiredLevel": 1 },
  { "_id": 2, "name": "iron", "color": [181, 91, 37], "stroke": [181, 91, 37], "value": 100, "rate_of_decay":.001, "durability":100, "rarity": 10, "requiredLevel": 2 },
  { "_id": 3, "name": "gold", "color": [255, 255, 152], "stroke": [255, 255, 152], "value": 200, "rate_of_decay":.001, "durability":255, "rarity": 20, "requiredLevel": 3 },
  { "_id": 4, "name": "diamond", "color": [184, 241, 252], "stroke": [184, 241, 252], "value": 500, "rate_of_decay":.001, "durability":512, "rarity": 50, "requiredLevel": 10 }
];

function createOre(p,t) {
  ores.push(new Ore);
  ores[ores.length-1].pos = p;
  ores[ores.length-1].oreType = t;
}

function oreBurnColor(ore,i) {
  ore.oreType["color"] = [255,oreBurn[i],oreBurn[i]];
  ore.oreType["stroke"] = [255,oreBurn[i],oreBurn[i]];
}

function oreRegColor(ore,i) {
  var ore_id = ore.oreType._id;
  console.log(ore_id);
  ore.oreType["color"] = oreTypes[ore_id]["color"];
  ore.oreType["stroke"] = oreTypes[ore_id]["color"];
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
  // console.log(r,o.rarity);
  if ( r == o.rarity ) {
    oreMatchRarity = true;
  }
  if (oreMatchLevel && oreMatchRarity) {
    // console.log(o);
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
  this.isBurning = false;

  this.burning = function(b) {
    console.log(b);
    if (b) {
      this.isBurning = true;
    } else {
      this.isBurning = false;
    }
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.heading += this.rotationSpeed * this.rotationDir;
    // if (this.isBurning) {
    //   this.oreType["color"][0] += 1;
    //   this.oreType["color"][1] += 1;
    //   this.oreType["color"][2] += 1;
    // }
    // } else {
    //   this.oreType["color"] = oreTypes[this.oreType._id]["color"];
    //   this.oreType["stroke"] = oreTypes[this.oreType._id]["stroke"];
    // }
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
    stroke(this.oreType["stroke"]);
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
