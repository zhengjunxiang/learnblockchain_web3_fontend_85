import type { Board, Player, SquareValue, Winner } from "./types";

export function createInitialBoard(): Board {
  return Array(9).fill(null) as Board;
}

export function getNextPlayer(board: Board): Player {
  const xCount = board.filter((v) => v === "X").length;
  const oCount = board.filter((v) => v === "O").length;
  return xCount === oCount ? "X" : "O";
}

export function isBoardFull(board: Board): boolean {
  return board.every((v) => v !== null);
}

export function calculateWinner(board: Board): Winner {
  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    const va: SquareValue = board[a];
    if (va && va === board[b] && va === board[c]) {
      return va;
    }
  }
  if (isBoardFull(board)) return "Draw";
  return null;
}


