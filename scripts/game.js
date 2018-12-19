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
