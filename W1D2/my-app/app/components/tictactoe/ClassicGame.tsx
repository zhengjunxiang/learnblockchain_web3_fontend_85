"use client";
import { useMemo, useState } from "react";
import type { Board, Player, Winner } from "./types";
import { calculateWinner, createInitialBoard, getNextPlayer } from "./utils";

type SquareProps = {
  value: Board[number];
  onClick: () => void;
  highlight: boolean;
};

function Square({ value, onClick, highlight }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 border flex items-center justify-center text-2xl font-bold ${
        highlight ? "bg-yellow-200" : ""
      }`}
    >
      {value ?? ""}
    </button>
  );
}

type BoardViewProps = {
  board: Board;
  onPlay: (index: number) => void;
  disabled: boolean;
};

function BoardView({ board, onPlay, disabled }: BoardViewProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((v, i) => (
        <Square
          key={i}
          value={v}
          onClick={() => !disabled && onPlay(i)}
          highlight={false}
        />
      ))}
    </div>
  );
}

export function ClassicGame() {
  const [history, setHistory] = useState<Board[]>([createInitialBoard()]);
  const [step, setStep] = useState(0);

  const board = history[step];
  const winner: Winner = useMemo(() => calculateWinner(board), [board]);
  const nextPlayer: Player = useMemo(() => getNextPlayer(board), [board]);

  function handlePlay(index: number) {
    if (board[index] || winner) return;
    const newBoard: Board = [...board];
    newBoard[index] = nextPlayer;
    const newHistory = [...history.slice(0, step + 1), newBoard];
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  }

  function jumpTo(s: number) {
    setStep(s);
  }

  function reset() {
    setHistory([createInitialBoard()]);
    setStep(0);
  }

  const status = winner
    ? winner === "Draw"
      ? "平局"
      : `胜者: ${winner}`
    : `下一步: ${nextPlayer}`;

  return (
    <div className="space-y-3">
      <div className="text-sm">父子通信（props/回调）</div>
      <BoardView board={board} onPlay={handlePlay} disabled={!!winner} />
      <div className="text-sm">{status}</div>
      <div className="w-full max-w-50 border rounded p-2">
        <div className="flex gap-2 flex-wrap">
          {history.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`px-2 py-1 border rounded text-sm whitespace-nowrap ${
                step === i ? "bg-black text-white dark:bg-white dark:text-black" : ""
              }`}
            >
              {i === 0 ? "开始" : `第${i}步`}
            </button>
          ))}
          <button onClick={reset} className="px-2 py-1 border rounded text-sm whitespace-nowrap">
            重置
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassicGame;


