import { useChunk, useDerive } from "stunk/react";

import CounterRef from "../components/counter-ref";

import { counter } from "../store/counter";

export default function Counter() {
  const [count, set_count, reset_count] = useChunk(counter);
  const double = useDerive(counter, (value) => value * 2);

  const canUndo = counter.canUndo();
  const canRedo = counter.canRedo();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-indigo-300 mb-2">Counter</h1>
        <div className="h-1 w-24 bg-indigo-500 mx-auto rounded"></div>
      </div>

      <div className="rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-6 mb-8">
          <div className="relative">
            <div className="text-6xl font-bold text-white">{count}</div>
            <CounterRef count={count} />
          </div>

          <div className="text-2xl text-gray-600">
            Doubled Count:{" "}
            <span className="font-semibold text-indigo-500">{double}</span>
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-6">
          <button
            onClick={() => set_count((prev) => prev + 1)}
            className="btn btn-primary btn-lg"
          >
            Increment
          </button>

          <button
            onClick={() => set_count((prev) => prev - 1)}
            className={`btn btn-secondary btn-lg ${
              count <= 0 && "btn-disabled" // you can remove this logic -- You will decrement to negative
            } `}
          >
            Decrement
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset_count()}
            className="btn btn-warning btn-lg"
          >
            Reset
          </button>

          <button
            aria-disabled={!canUndo}
            className={`btn btn-info btn-lg ${!canUndo && "btn-disabled"}`}
            onClick={() => counter.undo()}
          >
            Undo
          </button>

          <button
            className={`btn btn-info btn-lg ${!canRedo && "btn-disabled"}`}
            onClick={() => counter.redo()}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}
