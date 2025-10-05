import { useChunk, useDerive } from "stunk/react";
import { RotateCcw, Undo2, Redo2, Plus, Minus } from "lucide-react";

import CounterRef from "@/components/counter/counter-ref";
import GoBack from "@/components/shared/go-back";
import Heading from "@/components/shared/heading";

import { counter } from "@/store/counter-store";

export default function Counter() {
  const [count, set_count, reset_count] = useChunk(counter);
  const double = useDerive(counter, (value) => value * 2);

  const canUndo = counter.canUndo();
  const canRedo = counter.canRedo();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Heading text="Counter" />

        <div className="card bg-base-200 border border-base-300 shadow-xl">
          <div className="card-body p-8 md:p-12">
            {/* Main Counter Display */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="relative">
                <div className="text-8xl md:text-9xl font-black text-base-content tabular-nums tracking-tight">
                  {count}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#2af4c2] to-transparent opacity-50"></div>
              </div>

              <CounterRef count={count} />

              {/* Derived Value Display */}
              <div className="badge badge-lg bg-[#2af4c2]/10 border-[#2af4c2]/30 text-base-content gap-2 px-6 py-4">
                <span className="opacity-70">Doubled:</span>
                <span className="font-bold text-lg">{double}</span>
              </div>
            </div>

            {/* Primary Actions - Grid Layout */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => set_count((prev) => prev + 1)}
                className="btn btn-lg bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2 group"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Increment
              </button>

              <button
                onClick={() => set_count((prev) => prev - 1)}
                disabled={count <= 0}
                className="btn btn-lg btn-secondary gap-2 group"
              >
                <Minus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Decrement
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="divider text-sm opacity-50">History Controls</div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => counter.undo()}
                disabled={!canUndo}
                className="btn btn-outline btn-info gap-2"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
                <span className="hidden sm:inline">Undo</span>
              </button>

              <button
                onClick={() => reset_count()}
                className="btn btn-outline btn-warning gap-2"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => counter.redo()}
                disabled={!canRedo}
                className="btn btn-outline btn-info gap-2"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
                <span className="hidden sm:inline">Redo</span>
              </button>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div
                className={`badge badge-sm ${
                  canUndo ? "badge-success" : "badge-ghost opacity-30"
                }`}
              >
                {canUndo ? "✓" : "○"} Undo
              </div>
              <div
                className={`badge badge-sm ${
                  canRedo ? "badge-success" : "badge-ghost opacity-30"
                }`}
              >
                {canRedo ? "✓" : "○"} Redo
              </div>
            </div>
          </div>
        </div>

        <GoBack />
      </div>
    </div>
  );
}
