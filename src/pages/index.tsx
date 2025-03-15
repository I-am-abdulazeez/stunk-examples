import { Link } from "react-router-dom";

import Brands from "../components/brands";

export default function Index() {
  return (
    <>
      <Brands />
      <div className="px-10">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Vite + React + Stunk
        </h1>
        <div>
          <h3 className="text-xl md:text-2xl my-5">
            These examples demonstrates how to use Stunk with React.
          </h3>
        </div>
        <div className="flex items-center gap-4 mt-10">
          <Link to={"/counter"}>
            <button className="btn btn-lg">Counter</button>
          </Link>
          <Link to={"/todo"}>
            <button className="btn btn-lg">Todo</button>
          </Link>
        </div>
      </div>
    </>
  );
}
