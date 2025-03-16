import { useChunk } from "stunk/react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

import { authChunk, login, logout } from "@/store/auth-store";

export default function AuthManager() {
  const [auth] = useChunk(authChunk);

  return (
    <>
      <Heading text="Auth Manager" />
      <div className="flex flex-col items-center gap-4 p-6 border-2 border-gray-700 rounded-lg">
        {auth.loading ? (
          <button className="btn btn-lg">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        ) : auth.isAuthenticated ? (
          <>
            <p className="text-lg">Welcome, {auth.user?.name}!</p>
            <button
              onClick={logout}
              className="btn btn-error btn-lg shadow-none"
            >
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
            className="btn btn-success shadow-none btn-lg"
          >
            Login
          </button>
        )}
      </div>
      <GoBack />
    </>
  );
}
