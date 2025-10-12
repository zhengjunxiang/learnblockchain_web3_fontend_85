"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Board, Player, Winner } from "./types";
import { calculateWinner, createInitialBoard, getNextPlayer } from "./utils";

type EventBusEvents = {
  play: (index: number) => void;
  reset: () => void;
};

class EventBus {
  private listeners: { [K in keyof EventBusEvents]?: Set<EventBusEvents[K]> } = {};

  on<K extends keyof EventBusEvents>(event: K, handler: EventBusEvents[K]) {
    if (!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event]!.add(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof EventBusEvents>(event: K, handler: EventBusEvents[K]) {
    this.listeners[event]?.delete(handler);
  }

  emit<K extends keyof EventBusEvents>(event: K, ...args: Parameters<EventBusEvents[K]>) {
    this.listeners[event]?.forEach((h) => h(...(args as any)));
  }
}

export function EventBusGame() {
  const busRef = useRef(new EventBus());
  const [board, setBoard] = useState<Board>(createInitialBoard());

  const winner: Winner = useMemo(() => calculateWinner(board), [board]);
  const nextPlayer: Player = useMemo(() => getNextPlayer(board), [board]);

  useEffect(() => {
    const unsubPlay = busRef.current.on("play", (index) => {
      setBoard((prev) => {
        if (prev[index] || calculateWinner(prev)) return prev;
        const newBoard: Board = [...prev];
        newBoard[index] = getNextPlayer(prev);
        return newBoard;
      });
    });
    const unsubReset = busRef.current.on("reset", () => setBoard(createInitialBoard()));
    return () => {
      unsubPlay();
      unsubReset();
    };
  }, []);

  const status = winner
    ? winner === "Draw"
      ? "平局"
      : `胜者: ${winner}`
    : `下一步: ${nextPlayer}`;

  return (
    <div className="space-y-3">
      <div className="text-sm">事件总线（发布/订阅）</div>
      <BoardView bus={busRef.current} board={board} disabled={!!winner} />
      <div className="text-sm">{status}</div>
      <div className="flex gap-2">
        <button
          onClick={() => busRef.current.emit("reset")}
          className="px-2 py-1 border rounded text-sm"
        >
          重置
        </button>
      </div>
    </div>
  );
}

function BoardView({ bus, board, disabled }: { bus: EventBus; board: Board; disabled: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((v, i) => (
        <button
          key={i}
          className="w-16 h-16 border flex items-center justify-center text-2xl font-bold"
          onClick={() => !disabled && bus.emit("play", i)}
        >
          {v ?? ""}
        </button>
      ))}
    </div>
  );
}

export default EventBusGame;


