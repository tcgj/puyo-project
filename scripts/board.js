var board_matrix = [];

function update_board() {
  board.reset();

  // draw latest positions
  for (let i = 0; i < puyo_list.length; ++i) {
    let curr = puyo_list[i];
    curr.update();
    if (curr.r_index < 2 && !curr.falling) {
      console.log("Game Over");
      stop();
    }
  }
}

function init_matrix(arr) {
  var row = 15; // 2 ceilings + 12 rows + floor
  var col = 6; // 6 columns
  for (let r = 0; r < row; ++r) {
    arr[r] = [];
    for (let c = 0; c < col; ++c) {
      if (r < 14) {
        arr[r][c] = "X";
      } else {
        arr[r][c] = "FLOOR";
      }
    }
  }
}
