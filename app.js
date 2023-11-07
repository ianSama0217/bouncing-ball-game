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

//設定玩家操控的木板
let ground_x = 160;
let ground_y = 500;
let ground_height = 5;
let ground_width = 75;

//監聽畫布滑鼠移動事件
c.addEventListener("mousemove", (e) => {
  //console.log(e.clientX); //277~646
  ground_x = e.clientX - 277;
});

function drawCircle() {
  //遊戲開始時移動球的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  //確認球是否撞擊玩家的木板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 75 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    //防止球卡在木板
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  if (circle_x >= canvasWidth - radius) {
    //球碰到邊界要改變移動方向
    //右邊邊界
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

  //劃出可控制的地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, ground_width, ground_height);

  //劃出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
