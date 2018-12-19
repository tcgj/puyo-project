function puyo(colour, x, y) {
  var ctx = board.context;

  // attributes
  this.x = x + 22.5;
  this.y = y + 22.5;
  this.colour = colour;
  this.update = function() {
    var grd = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 20);
    grd.addColorStop(0, this.colour);
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
    ctx.fill();
  }
  this.destroy = function() {
    var instances = this.constructor.instances;
    if (instances.indexOf(this) !== -1) {
      instances.splice(instances.indexOf(this), 1);
    }
    delete this;
  }

  // add to array of instances
  if (this.constructor.instances === undefined) {
    this.constructor.instances = [this];
  } else {
    this.constructor.instances.push(this);
  }
  // add to board_matrix
  board_matrix[((this.y - 42.5) / 45)][(this.x - 42.5) / 45] = this;
  this.update();
}
