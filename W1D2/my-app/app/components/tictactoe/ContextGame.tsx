"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { Board, Player, Winner } from "./types";
import { calculateWinner, createInitialBoard, getNextPlayer } from "./utils";

type GameContextValue = {
  board: Board;
  winner: Winner;
  nextPlayer: Player;
  play: (index: number) => void;
  reset: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame 必须在 GameProvider 中使用");
  return ctx;
}

function GameProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const winner: Winner = useMemo(() => calculateWinner(board), [board]);
  const nextPlayer: Player = useMemo(() => getNextPlayer(board), [board]);

  function play(index: number) {
    if (board[index] || winner) return;
    setBoard((prev) => {
      const newBoard: Board = [...prev];
      newBoard[index] = nextPlayer;
      return newBoard;
    });
  }

  function reset() {
    setBoard(createInitialBoard());
  }

  const value: GameContextValue = {
    board,
    winner,
    nextPlayer,
    play,
    reset,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function Square({ index }: { index: number }) {
  const { board, play } = useGame();
  const value = board[index];
  return (
    <button
      onClick={() => play(index)}
      className="w-16 h-16 border flex items-center justify-center text-2xl font-bold"
    >
      {value ?? ""}
    </button>
  );
}

function BoardView() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <Square key={i} index={i} />
      ))}
    </div>
  );
}

export function ContextGame() {
  return (
    <GameProvider>
      <Inner />
    </GameProvider>
  );
}

function Inner() {
  const { winner, nextPlayer, reset } = useGame();
  const status = winner
    ? winner === "Draw"
      ? "平局"
      : `胜者: ${winner}`
    : `下一步: ${nextPlayer}`;
  return (
    <div className="space-y-3">
      <div className="text-sm">Context 通信</div>
      <BoardView />
      <div className="text-sm">{status}</div>
      <button onClick={reset} className="px-2 py-1 border rounded text-sm">
        重置
      </button>
    </div>
  );
}

export default ContextGame;


