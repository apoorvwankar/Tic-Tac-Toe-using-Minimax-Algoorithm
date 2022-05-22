let USER = -1;
let OPPONENT = +1;

let board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

function evalute(position){
	let score = 0;

	if (gameOver(position, OPPONENT)) {
		score = +1;
	}
	else if (gameOver(position, USER)) {
		score = -1;
	} else {
		score = 0;
	}
	``
	return score;
}

function gameOver(position, player) {
	let win_position = [
		[position[0][0], position[0][1], position[0][2]],
		[position[1][0], position[1][1], position[1][2]],
		[position[2][0], position[2][1], position[2][2]],
		[position[0][0], position[1][0], position[2][0]],
		[position[0][1], position[1][1], position[2][1]],
		[position[0][2], position[1][2], position[2][2]],
		[position[0][0], position[1][1], position[2][2]],
		[position[2][0], position[1][1], position[0][2]],
	];

	for (let i = 0; i < 8; i++) {
		let line = win_position[i];
		let filled = 0;
		for (let j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}

function gameOverAll(position) {
	return gameOver(position, USER) || gameOver(position, OPPONENT);
}

function emptyCells(position) {
	let cells = [];
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			if (position[x][y] == 0)
				cells.push([x, y]);
		}
	}

	return cells;
}

function validMove(x, y) {
	let empties = emptyCells(board);
	try {
		if (board[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch(e){
		return false;
	}
}

function setMove(x, y, player) {
	if (validMove(x, y)) {
		board[x][y] = player;
		return true;
	}
	else {
		return false;
	}
}

function minimax(position, depth, player) {
	let best;

	if (player == OPPONENT) {
		best = [-1, -1, -1000];
	}
	else {
		best = [-1, -1, +1000];
	}

	if (depth == 0 || gameOverAll(position)) {
		let score = evalute(position);
		return [-1, -1, score];
	}

	emptyCells(position).forEach(function (cell) {
		let x = cell[0];
		let y = cell[1];
		position[x][y] = player;
		let score = minimax(position, depth - 1, -player);
		position[x][y] = 0;
		score[0] = x;
		score[1] = y;

		if (player == OPPONENT) {
			if (score[2] > best[2])
				best = score;
		}
		else {
			if (score[2] < best[2])
				best = score;
		}
	});

	return best;
}

function aiTurn() {
	let x, y;
	let move;
	let cell;

	if (emptyCells(board).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = minimax(board, emptyCells(board).length, OPPONENT);
		x = move[0];
		y = move[1];
	}

	if (setMove(x, y, OPPONENT)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

function clickedCell(cell) {
	let button = document.getElementById("bnt-restart");
	button.disabled = true;
	let conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
		let x = cell.id.split("")[0];
		let y = cell.id.split("")[1];
		let move = setMove(x, y, USER);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				aiTurn();
		}
	}
	if (gameOver(board, OPPONENT)) {
		let lines;
		let cell;
		let msg;

		if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}

		msg = document.getElementById("message");
		msg.innerHTML = "You lose!";
	}
	if (emptyCells(board).length == 0 && !gameOverAll(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
	if (gameOverAll(board) == true || emptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

function restartBnt(button) {
	if (button.value == "Play") {
		aiTurn();
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		let htmlBoard;
		let msg;

		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				board[x][y] = 0;
				htmlBoard = document.getElementById(String(x) + String(y));
				htmlBoard.style.color = "#444";
				htmlBoard.innerHTML = "";
			}
		}
		button.value = "Play";
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}
