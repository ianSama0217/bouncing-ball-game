const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");

//設定圓球資料
let circle_x = 200;
let circle_y = 30;
let radius = 15;

//球的移動速度
let xSpeed = 10;
let ySpeed = 10;

function drawCircle() {
  //遊戲開始時移動球的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  //球碰到邊界要改變移動方向
  //右邊邊界
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  //左邊邊界
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  //上邊邊界
  if (circle_y < radius) {
    ySpeed *= -1;
  }
  //下邊邊界
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //劃出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
