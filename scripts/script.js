var board = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 310;
    this.canvas.height = 580;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateboard, 1000);
  },
  reset : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw_board();
    draw_grid();
  }
}

var board_matrix = [];

function start_game() {
  // initialise board_matrix
  init_matrix(board_matrix);
  // initialise canvas
  board.start();
  // draw board/grid
  draw_board();
  draw_grid();

  var puyo_test = new puyo("red", 20, 20);
  var puyo_test2 = new puyo("blue", 20, 110);
  var puyo_test3 = new puyo("blue", 65, 110);
  var puyo_test4 = new puyo("blue", 20, 200);
  var puyo_test5 = new puyo("blue", 65, 200);
}

function updateboard() {
  board.reset();
  for (let i = 0; i < puyo.instances.length; ++i) {
    let curr = puyo.instances[i];
    let r_index = (curr.y - 42.5) / 45;
    let c_index = (curr.x - 42.5) / 45;

    // check if falling
    if (board_matrix[r_index + 1][c_index] === "X") {
      board_matrix[r_index][c_index] = "X";
      board_matrix[r_index + 1][c_index] = curr;
      curr.y += 45;
    }

    // check if flooded
    let flooded = flood_check(r_index, c_index, curr.colour);
    if (Array.isArray(flooded)) {
      setTimeout(function() {
        for (let j = 0; j < flooded.length; ++j) {
          board_matrix[(flooded[j].y - 42.5) / 45][(flooded[j].x - 42.5) / 45] = "X";
          flooded[j].destroy();
        }
      }, 100);
    }

    curr.update();
  }
}

function flood_check(row, col, colour) {
  var copy = [];
  init_matrix(copy);

  function recur(row, col) {
    if (col > 5 || col < 0 || row > 11 || row < 0 || typeof board_matrix[row][col] !== 'object' ||
      board_matrix[row][col].colour !== colour || copy[row][col] === "flood") {
      return [];
    }

    copy[row][col] = "flood";
    var result = new Array(board_matrix[row][col]);

    var left = recur(row, col - 1);
    var right = recur(row, col + 1);
    var up = recur(row - 1, col);
    var down = recur(row + 1, col);
    return result.concat(left, right, up, down);
  }
  var cells = recur(row, col);
  console.log(cells);
  return cells.length >= 4 ? cells : "X";
}

function puyo(colour, x, y) {
  this.x = x + 22.5;
  this.y = y + 22.5;
  this.colour = colour;
  var ctx = board.context;
  if (this.constructor.instances === undefined) {
    this.constructor.instances = [this];
  } else {
    this.constructor.instances.push(this);
  }
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

  board_matrix[((this.y - 42.5) / 45)][(this.x - 42.5) / 45] = this;
  this.update();
}

function init_matrix(arr) {
  var row = 13; // 12 rows + floor
  var col = 6; // 6 columns
  for (let r = 0; r < row; ++r) {
    arr[r] = [];
    for (let c = 0; c < col; ++c) {
      if (r < 12) {
        arr[r][c] = "X";
      } else {
        arr[r][c] = "FLOOR";
      }
    }
  }
}

function draw_board() {
  var ctx = board.context;
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, 310, 580);
  ctx.fillRect(20, 20, 270, 540);
}

// check and test grids
// 270 x 540, starts at x=20,y=20, ends at x=290,y=560
function draw_grid() {
  var ctx = board.context;
  ctx.strokeStyle = "#FFFFFF";
  ctx.beginPath();
  // vertical lines
  ctx.moveTo(65, 20);
  ctx.lineTo(65, 560);
  ctx.moveTo(110, 20);
  ctx.lineTo(110, 560);
  ctx.moveTo(155, 20);
  ctx.lineTo(155, 560);
  ctx.moveTo(200, 20);
  ctx.lineTo(200, 560);
  ctx.moveTo(245, 20);
  ctx.lineTo(245, 560);

  // horizontal lines
  ctx.moveTo(20, 65);
  ctx.lineTo(290, 65);
  ctx.moveTo(20, 110);
  ctx.lineTo(290, 110);
  ctx.moveTo(20, 155);
  ctx.lineTo(290, 155);
  ctx.moveTo(20, 200);
  ctx.lineTo(290, 200);
  ctx.moveTo(20, 245);
  ctx.lineTo(290, 245);
  ctx.moveTo(20, 290);
  ctx.lineTo(290, 290);
  ctx.moveTo(20, 335);
  ctx.lineTo(290, 335);
  ctx.moveTo(20, 380);
  ctx.lineTo(290, 380);
  ctx.moveTo(20, 425);
  ctx.lineTo(290, 425);
  ctx.moveTo(20, 470);
  ctx.lineTo(290, 470);
  ctx.moveTo(20, 515);
  ctx.lineTo(290, 515);
  ctx.stroke();
}
