var board = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 310;
    this.canvas.height = 580;
    this.canvas.id = "board";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.board_interval = setInterval(update_board, 20);
    this.move_interval = setInterval(update_pos, 700);
    document.body.addEventListener("keydown", event_handler);
  },
  reset : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw_board();
    draw_grid();
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
