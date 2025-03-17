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
        <div className="flex items-center gap-4 mt-10 flex-wrap max-w-[500px] justify-center">
          <Link to={"/counter"}>
            <button className="btn btn-lg">Counter</button>
          </Link>
          <Link to={"/todo"}>
            <button className="btn btn-lg">Todo</button>
          </Link>
          <Link to={"/theme-switch"}>
            <button className="btn btn-lg">Theme Switch</button>
          </Link>
          <Link to={"/auth-manager"}>
            <button className="btn btn-lg">Auth Manager</button>
          </Link>
          <Link to={"/cart"}>
            <button className="btn btn-lg">Shopping Cart</button>
          </Link>
          <Link to={"/users"}>
            <button className="btn btn-lg">Fetch Users</button>
          </Link>
          <Link to={"/form-manager"}>
            <button className="btn btn-lg">Form Manager</button>
          </Link>
          <Link to={"/notify"}>
            <button className="btn btn-lg">Notification</button>
          </Link>
          <Link to={"/multi-step"}>
            <button className="btn btn-lg">Multi Step Wizard</button>
          </Link>
        </div>
      </div>
    </>
  );
}
