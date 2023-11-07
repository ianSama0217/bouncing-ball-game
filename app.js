const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");

//設定圓球資料
let circle_x = 200;
let circle_y = 30;
let radius = 10;

//球的移動速度
let xSpeed = 10;
let ySpeed = 10;

//設定玩家操控的木板
let ground_x = 160;
let ground_y = 500;
let ground_height = 5;
let ground_width = 75;

//存放磚塊的陣列
let brickArray = [];

//磚頭生成範圍的min~max隨機整數
function getRandomArbitrary(min, max) {
  min = Math.ceil(min / 10) * 10; // 向上取整到最接近的10的倍数
  max = Math.floor(max / 10) * 10; // 向下取整到最接近的10的倍数
  return Math.floor(Math.random() * ((max - min) / 10) + 1) * 10 + min;
}

//創建磚塊
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 25;
    brickArray.push(this);
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY <= this.y + this.height + radius &&
      ballY >= this.y - radius
    );
  }
}

//判斷磚頭是否重疊
function isOverlap(brick, existingBricks) {
  for (const existingBrick of existingBricks) {
    if (
      brick.x < existingBrick.x + existingBrick.width &&
      brick.x + brick.width > existingBrick.x &&
      brick.y < existingBrick.y + existingBrick.height &&
      brick.y + brick.height > existingBrick.y
    ) {
      return true;
    }
  }
  return false;
}

for (let i = 0; i < 15; i++) {
  let x, y;
  do {
    x = getRandomArbitrary(0, 350);
    y = getRandomArbitrary(0, 300);
  } while (isOverlap({ x, y, width: 50, height: 25 }, brickArray));

  const newBrick = new Brick(x, y);
}

//製作磚頭
for (let i = 0; i < 15; i++) {
  let x, y;
  do {
    x = getRandomArbitrary(0, 350);
    y = getRandomArbitrary(0, 300);
  } while (isOverlap({ x, y }, brickArray));
}

//監聽畫布滑鼠移動事件
c.addEventListener("mousemove", (e) => {
  //console.log(e.clientX); //277~646
  //console.log(e.clientY); //6~556
  ground_x = e.clientX - 277;
});

//確認球是否有打到磚塊

function drawCircle() {
  //遊戲開始時移動球的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  //確認球是否有打到磚塊
  brickArray.forEach((brick, index) => {
    if (brick.touchBall(circle_x, circle_y)) {
      //從上或下撞到磚塊
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        ySpeed *= -1;
      }
      //從左或右撞到方塊
      else if (circle_x <= brick.x || circle_x >= brick.x + brick.width) {
        ySpeed *= -1;
      }
      //刪除打到磚頭的索引直
      brickArray.splice(index, 1);

      if (brickArray.length == 0) {
        alert("遊戲結束!你贏了!");
        clearInterval(game);
      }
    }
  });

  //確認球是否撞擊玩家的木板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 75 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    //防止球卡在木板
    if (ySpeed > 0) {
      circle_y -= 20;
    } else {
      circle_y += 20;
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

  //劃出所有的磚頭
  brickArray.forEach((brick) => {
    brick.drawBrick();
  });

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
