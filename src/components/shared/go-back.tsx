import { Link } from "react-router-dom";

export default function GoBack() {
  return (
    <div className="mt-4">
      <Link className="link link-hover" to={"/"}>
        Go home
      </Link>
    </div>
  );
}
