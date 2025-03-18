import { Link } from "react-router-dom";

export default function AppLink({ to, text }: { to: string; text: string }) {
  return (
    <Link to={to}>
      <button className="btn btn-md md:btn-lg">{text}</button>
    </Link>
  );
}
