const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas dimensions
canvas.width = 800;
canvas.height = 800;

// draw canvas border in css
canvas.style.border = "1px solid black";

const data = {
  point1: {
    x: 100,
    y: 100,
  },
  point2: {
    x: 500,
    y: 500,
  },

  smallPoints: [], // { point1, point2, smallPoints: [] }
};

data.smallPoints = divideLine(data.point1, data.point2, 10);
// addRandomPoints(2);

// game loop
function gameLoop() {
  // gray background
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw line from point1 to all small points and point2
  for (let i = 0; i < data.smallPoints.length - 1; i++) {
    drawLine(
      {
        x: data.smallPoints[i].x,
        y: data.smallPoints[i].y,
      },
      { x: data.smallPoints[i + 1].x, y: data.smallPoints[i + 1].y },
      "red"
    );
  }

  update();

  requestAnimationFrame(gameLoop);
}

gameLoop();

// update points
function update() {
  data.smallPoints.forEach((point) => {
    const randomDirection = Math.random() > 0.5 ? 1 : -1;
    point.x += randomDirection * Math.random() * 10;
    point.y += randomDirection * Math.random() * 10;
  });
}

// draw  point
function drawPoint({ x, y }) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

function drawLine(point1, point2, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);

  ctx.stroke();

  //   drawPoint(point1);
  //   drawPoint(point2);
}

// add random points near line
function getRandomPointsBetweenTwoPoints(point1, point2, qty) {
  const points = [];
  for (let i = 0; i < qty; i++) {
    const x = randomNumber(point1.x, point2.x);
    const y = randomNumber(point1.y, point2.y);

    points.push({ x, y });
  }

  return points;
}

// random number
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// divide line into equal parts and save in array
function divideLine(point1, point2, qty = 10) {
  const xStep = (point2.x - point1.x) / qty;
  const yStep = (point2.y - point1.y) / qty;

  const points = [];
  for (let i = 0; i < qty; i++) {
    const smalPoints = getRandomPointsBetweenTwoPoints(
      { x: point1.x + xStep * i, y: point1.y + yStep * i },
      { x: point1.x + xStep * (i + 1), y: point1.y + yStep * (i + 1) },
      2
    );

    // points.push({
    //   point1: { x: point1.x + xStep * i, y: point1.y + yStep * i },
    //   point2: { x: point1.x + xStep * (i + 1), y: point1.y + yStep * (i + 1) },
    //   smalPoints,
    // });
    points.push(...smalPoints);
  }

  console.log(points);
  return points;
}
