import { useEffect, useRef } from "react";

export default function CounterRef({ count }: { count: number }) {
  const prevCountRef = useRef(count);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <>
      <div
        className={`absolute -top-4 right-0 text-green-500 text-xl font-medium transition-opacity duration-300 ${
          count > prevCountRef.current ? "opacity-100" : "opacity-0"
        }`}
      >
        +1
      </div>
      <div
        className={`absolute -bottom-4 right-0 text-red-500 text-xl font-medium transition-opacity duration-300 ${
          count < prevCountRef.current ? "opacity-100" : "opacity-0"
        }`}
      >
        -1
      </div>
    </>
  );
}
