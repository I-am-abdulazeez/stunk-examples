import { useChunk } from "stunk/react";

import { authChunk, login, logout } from "@/store/auth-store";
import GoBack from "@/components/shared/go-back";

export default function AuthManager() {
  const [auth] = useChunk(authChunk);

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6 border-2 border-gray-700 rounded-lg">
        {auth.loading ? (
          <button className="btn">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        ) : auth.isAuthenticated ? (
          <>
            <p className="text-lg">Welcome, {auth.user?.name}!</p>
            <button onClick={logout} className="btn btn-error shadow-none">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              login({
                id: "1",
                name: "Olamide Olarewaju",
                email: "olamide@example.com",
              })
            }
            className="btn btn-success shadow-none"
          >
            Login
          </button>
        )}
      </div>
      <GoBack />
    </>
  );
}
