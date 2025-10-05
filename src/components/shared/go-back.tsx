import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function GoBack() {
  return (
    <div className="flex justify-center mt-8">
      <Link to="/" className="btn btn-ghost gap-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <Home className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
