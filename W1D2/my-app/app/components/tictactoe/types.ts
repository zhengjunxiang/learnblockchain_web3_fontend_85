export type Player = "X" | "O";

export type SquareValue = Player | null;

export type Board = [
  SquareValue, SquareValue, SquareValue,
  SquareValue, SquareValue, SquareValue,
  SquareValue, SquareValue, SquareValue
];

export type Winner = Player | "Draw" | null;


