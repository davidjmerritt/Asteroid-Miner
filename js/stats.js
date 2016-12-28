function Stats() {
  this.info = {
    "score": 0,
    "level": 0
  }
  this.fontFace = "Helvetica";
  this.col = (230,230,230);
  this.pos = createVector(50,50+20);
  this.fontSize = 16;

  this.update = function(score,level) {
    this.info = {
      "score": score,
      "level": level
    }
  }

  this.render = function() {
    push();
    fill(this.col);
    textFont(this.fontFace,this.fontSize);
    text(this.info.score, this.pos.x, this.pos.y, 50, 50);
    noFill()
    stroke("gray");
    beginShape();
    vertex(25, 25);
    vertex(25, 330);
    vertex(130, 330);
    vertex(130, 25);
    vertex(25, 25);
    endShape();
    // translate(this.pos.x, this.pos.y);
    fill(this.col);
    textFont(this.fontFace,this.fontSize);
    text("L", 44, 50, 50, 50);
    fill(this.col);
    textFont(this.fontFace,this.fontSize);
    text(this.info.level, 84, 49, 100, 100);
    pop();
  }
}

var statOres = [];
var statText = [];
var oresCollected = {};

function createStats() {
  statOres = [];
  statText = [];
  oresCollected = {};
  for (i=0;i<oreTypes.length;i++) {
    statOres.push(new Ore);
    var o = oreTypes[i];
    var oi = statOres.length-1;
    statOres[oi].oreType = o;
    statOres[oi].pos = createVector(50, 50*(i+2));
    statOres[oi].vel = 0;

    oresCollected[o.name] = 0;

    statText.push(new Stats());
    statText[oi].pos = createVector(50+35, 50*(i+2)-8);
  }
  // console.log(oresCollected,statText);
}

function showStats() {
  for (var i = 0; i < statOres.length; i++) {
    statOres[i].render();
    statOres[i].update();
    statText[i].render();
    statText[i].update(oresCollected[statOres[i].oreType.name],numberOfAsteroids);
  }
}
