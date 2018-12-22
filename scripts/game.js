function start_game() {
  // clear puyo list
  puyo_list = [];
  // initialise board_matrix
  init_matrix(board_matrix);
  // initialise canvas
  board.start();
}

function restart() {
  stop();
  board.reset();
  start_game();
}

function stop() {
  clearInterval(board.board_interval);
  clearInterval(board.move_interval);
  document.body.removeEventListener("keydown", event_handler);
}

function event_handler(event) {
  var key_pressed = event.key;

  if (!curr_pair[0].falling || !curr_pair[1].falling) {
    return;
  }

  if (key_pressed === "a" || key_pressed === "ArrowLeft") {
    if (curr_pair[0].c_index > 0 && curr_pair[1].c_index > 0) {
      move_pair(0);
    }
  } else if (key_pressed === "s" || key_pressed === "ArrowDown") {
    if (curr_pair[0].r_index < 13 &&
      curr_pair[1].r_index < 13) {
        move_pair(1);
      }
  } else if (key_pressed === "d" || key_pressed === "ArrowRight") {
    if (curr_pair[0].c_index < 5 && curr_pair[1].c_index < 5) {
      move_pair(2);
    }
  } else if (key_pressed === " ") {
    rotate_pair();
  }
}

function move_pair(n) {
  var puyo1 = curr_pair[0];
  var puyo2 = curr_pair[1];
  var r_mod = 0;
  var c_mod = 0;

  if (n === 0) {
    c_mod = -1;
  } else if (n === 2) {
    c_mod = 1;
  } else if (n === 1) {
    r_mod = 1;
  }

  if (c_mod === 0 || (board_matrix[puyo1.r_index + r_mod][puyo1.c_index + c_mod] === "X"
  && board_matrix[puyo2.r_index + r_mod][puyo2.c_index + c_mod] === "X")) {
      move_puyo(puyo1, r_mod, c_mod);
      move_puyo(puyo2, r_mod, c_mod);
  }
}

function rotate_pair() {
  var puyo1 = curr_pair[0];
  var puyo2 = curr_pair[1];
  var pos = [
    [puyo1.r_index - 1, puyo1.c_index],
    [puyo1.r_index, puyo1.c_index + 1],
    [puyo1.r_index + 1, puyo1.c_index],
    [puyo1.r_index, puyo1.c_index - 1]];

  if (puyo1.r_index > puyo2.r_index) {
    move_puyo(puyo2, 1, 1);
  } else if (puyo1.r_index < puyo2.r_index) {
    move_puyo(puyo2, -1, -1);
  } else if (puyo1.c_index > puyo2.c_index) {
    move_puyo(puyo2, -1, 1);
  } else {
    move_puyo(puyo2, 1, -1);
  }
}
