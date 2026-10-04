const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let jumping = false;
let gameRunning = true;
let score = 0;
let obstacleX = window.innerWidth;

document.addEventListener("touchstart", jump);
document.addEventListener("click", jump);

function jump() {
  if (jumping || !gameRunning) return;

  jumping = true;

  let height = 0;

  const up = setInterval(() => {
    height += 8;
    player.style.bottom = (80 + height) + "px";

    if (height >= 180) {
      clearInterval(up);

      const down = setInterval(() => {
        height -= 8;
        player.style.bottom = (80 + height) + "px";

        if (height <= 0) {
          clearInterval(down);
          player.style.bottom = "80px";
          jumping = false;
        }
      }, 20);
    }
  }, 20);
}

function gameLoop() {

  if (!gameRunning) return;

  obstacleX -= 6;
  obstacle.style.left = obstacleX + "px";

  if (obstacleX < -60) {
    obstacleX = window.innerWidth + Math.random() * 300;
    score++;
    scoreText.textContent = score;
  }

  const p = player.getBoundingClientRect();
  const o = obstacle.getBoundingClientRect();

  if (
    p.right > o.left &&
    p.left < o.right &&
    p.bottom > o.top &&
    p.top < o.bottom
  ) {
    endGame();
  }

  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;

  finalScore.textContent = score;
  gameOver.style.display = "block";
}

function restartGame() {
  score = 0;
  scoreText.textContent = "0";

  obstacleX = window.innerWidth + 100;

  gameRunning = true;
  gameOver.style.display = "none";

  gameLoop();
}

gameLoop();
