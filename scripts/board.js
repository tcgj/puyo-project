var board_matrix = [];

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
