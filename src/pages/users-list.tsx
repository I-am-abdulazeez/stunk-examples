import { useAsyncChunk } from "stunk/react";
import { Users, RefreshCw, AlertCircle, User } from "lucide-react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

import { usersChunk } from "@/store/users-store";

export default function UserList() {
  const { data, loading, error, reload } = useAsyncChunk(usersChunk);

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-3xl">
        <Heading text="Users List" />

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="card-title text-2xl flex items-center gap-2">
                <Users className="w-6 h-6 text-[#2af4c2]" />
                {data && !loading ? `${data.length} Users` : "Users"}
              </h2>
              <button
                onClick={() => reload()}
                disabled={loading}
                className="btn btn-outline btn-sm gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Reload
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center gap-6 py-12">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <span className="loading loading-spinner loading-lg text-[#2af4c2]"></span>
                  <div className="absolute inset-0 bg-[#2af4c2] opacity-20 blur-xl rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">Loading users...</p>
                  <p className="text-sm opacity-60">Please wait a moment</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="alert alert-error">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Failed to load users</p>
                  <p className="text-sm opacity-90">{error.message}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && data && data.length === 0 && (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center">
                    <Users className="w-12 h-12 opacity-40" />
                  </div>
                </div>
                <p className="text-xl font-semibold mb-2">No users found</p>
                <p className="text-sm opacity-60">
                  Try reloading to fetch users
                </p>
              </div>
            )}

            {/* Users List */}
            {!loading && data && data.length > 0 && (
              <div className="space-y-3">
                {data.map((user) => (
                  <div
                    key={user.id}
                    className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-colors"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex justify-center shrink-0">
                          <div className="bg-[#2af4c2]/20 rounded-full w-12 h-12 flex items-center justify-center">
                            <User className="w-6 h-6 text-[#2af4c2]" />
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-lg">{user.name}</h3>
                          {user.email && (
                            <p className="text-sm opacity-60">{user.email}</p>
                          )}
                        </div>
                        <div className="badge badge-sm bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Footer */}
            {!loading && data && data.length > 0 && (
              <div className="stats shadow w-full mt-6">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value text-2xl text-[#2af4c2]">
                    {data.length}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Status</div>
                  <div className="stat-value text-xl text-success">Loaded</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
