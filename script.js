//your JS code here. If required.
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = Array(9).fill('');
let gameActive = true;

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();

  if (player1 && player2) {
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updateMessage();
  }
});

function updateMessage() {
  const message = document.querySelector('.message');
  const currentName = currentPlayer === 'X' ? player1 : player2;
  message.textContent = `${currentName}, you're up`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function handleCellClick(e) {
  const id = parseInt(e.target.id) - 1;
  if (!gameActive || board[id]) return;

  board[id] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    const winnerName = currentPlayer === 'X' ? player1 : player2;
    document.querySelector('.message').textContent = `${winnerName}, congratulations you won!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateMessage();
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

