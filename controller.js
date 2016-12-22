function Controller() {
  this.fire = function() {
    return 'FIRE';
  }

  this.render = function() {
    push();
    button = createButton('FIRE');
    button.position(150, 200);
    button.mousePressed(this.fire);

    pop();
  }

}
