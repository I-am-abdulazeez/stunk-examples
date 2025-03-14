import { Link } from "react-router-dom";
import Brands from "../components/brands";

export default function Index() {
  return (
    <>
      <Brands />
      <h1 className="font-semibold">Vite + React + Stunk</h1>
      <h3 className="text-2xl my-5">
        This examples demonstrates how to use Stunk with React.
      </h3>
      <p className="text-xl">
        Click on the routes below to see Stunk in action.
      </p>
      <div className="flex items-center justify-between mt-10">
        <Link to={"/counter"}>
          <button className="btn btn-xs md:btn-lg">Counter</button>
        </Link>
      </div>
    </>
  );
}
