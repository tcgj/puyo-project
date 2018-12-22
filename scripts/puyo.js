var PUYO_TYPES = ["red", "blue", "purple", "yellow", "green"];

// array of puyo objects
var puyo_list = [];
var curr_pair = [];

function init_puyos(flag) {
  var colour_1 = flag ? "red" : PUYO_TYPES[Math.floor(Math.random() * 5)];
  var colour_2 = flag ? "red" : PUYO_TYPES[Math.floor(Math.random() * 5)];
  var pos_1 = (Math.floor(Math.random() * 2) + 2);

  var puyo_1 = new puyo(colour_1, 1, pos_1);
  var puyo_2 = new puyo(colour_2, 0, pos_1);

  return [puyo_1, puyo_2];
}

function puyo(colour, r_index, c_index) {
  var ctx = board.context;

  // attributes
  this.r_index = r_index;
  this.c_index = c_index;
  this.colour = colour;
  this.falling = true;
  this.update = function() {
    this.x = this.c_index * 45 + 42.5;
    this.y = this.r_index * 45 - 47.5;
    var grd = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 20);
    grd.addColorStop(0, this.colour);
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
    ctx.fill();
  }
  this.destroy = function() {
    if (puyo_list.indexOf(this) !== -1) {
      puyo_list.splice(puyo_list.indexOf(this), 1);
    }
    delete this;
  }

  // add puyo to array of instances
  puyo_list.push(this);
  // add puyo to board_matrix
  board_matrix[this.r_index][this.c_index] = this;
  this.update();
}

function move_puyo(puyo_i, r_mod, c_mod) {
  if (board_matrix[puyo_i.r_index + r_mod][puyo_i.c_index + c_mod] === "X") {
    board_matrix[puyo_i.r_index][puyo_i.c_index] = "X";
    puyo_i.r_index += r_mod;
    puyo_i.c_index += c_mod;
    board_matrix[puyo_i.r_index][puyo_i.c_index] = puyo_i;
    return true;
  } else {
    return false;
  }
}

function update_pos() {
  var ready = true;

  // fall check
  for (let i = 0; i < puyo_list.length; ++i) {
    let curr = puyo_list[i];
    fall_check(curr);
    if (curr.falling) {
      move_puyo(curr, 1, 0);
      ready = false;
    }
  }

  // flood check
  if (ready) {
    for (let j = 0; j < puyo_list.length; ++j) {
      let curr = puyo_list[j];
      let flooded = flood_check(curr);
      if (flooded.length >= 4) {
        for (let k = 0; k < flooded.length; ++k) {
          board_matrix[flooded[k].r_index][flooded[k].c_index] = "X";
          flooded[k].destroy();
        }
        ready = false;
      }
    }
  }

  // launch next pair
  if (ready) {
    curr_pair = new init_puyos();
  }
}

function fall_check(puyo_i) {
  if (board_matrix[puyo_i.r_index + 1][puyo_i.c_index] === "X") {
    puyo_i.falling = true;
  } else {
    puyo_i.falling = false;
  }
}

function flood_check(puyo_i) {
  var copy = [];
  init_matrix(copy);

  function helper(r, c) {
    var curr = board_matrix[r][c];
    if (c > 5 || c < 0 || r > 13 || r < 2 || copy[r][c] === "flood"
      || typeof curr !== 'object' || curr.falling
      || curr.colour !== puyo_i.colour) {
      return [];
    } else {
      copy[r][c] = "flood";
      var result = [curr];

      var left = helper(r, c - 1);
      var right = helper(r, c + 1);
      var up = helper(r - 1, c);
      var down = helper(r + 1, c);
      return result.concat(left, right, up, down);
    }
  }
  return helper(puyo_i.r_index, puyo_i.c_index);
}
