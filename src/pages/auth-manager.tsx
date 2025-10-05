import { useChunk } from "stunk/react";
import { LogIn, LogOut, User, Mail, Shield, CheckCircle2 } from "lucide-react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

import { authChunk, login, logout } from "@/store/auth-store";

export default function AuthManager() {
  const [auth] = useChunk(authChunk);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Heading text="Auth Manager" />

        <div className="card bg-base-200 border border-base-300 shadow-xl">
          <div className="card-body p-8 md:p-12">
            {auth.loading ? (
              // Loading State
              <div className="flex flex-col items-center gap-6 py-12">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <span className="loading loading-spinner loading-lg text-[#2af4c2]"></span>
                  <div className="absolute inset-0 bg-[#2af4c2] opacity-20 blur-xl rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">Authenticating</p>
                  <p className="text-sm opacity-60">Please wait a moment...</p>
                </div>
              </div>
            ) : auth.isAuthenticated ? (
              // Authenticated State
              <div className="space-y-6">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#2af4c2]/20 text-[#2af4c2] rounded-full w-24 h-24 flex items-center justify-center">
                      <User className="w-12 h-12" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                  <p className="text-base-content/60">
                    You're successfully logged in
                  </p>
                </div>

                {/* User Info Card */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-[#2af4c2]" />
                      <h3 className="font-bold text-lg">Account Details</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#2af4c2]/10">
                          <User className="w-5 h-5 text-[#2af4c2]" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-xs opacity-60 mb-1">
                            Full Name
                          </div>
                          <div className="font-semibold text-lg">
                            {auth.user?.name}
                          </div>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#2af4c2]/10">
                          <Mail className="w-5 h-5 text-[#2af4c2]" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-xs opacity-60 mb-1">
                            Email Address
                          </div>
                          <div className="font-semibold">
                            {auth.user?.email}
                          </div>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm opacity-70">
                          Account Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats stats-vertical md:stats-horizontal shadow w-full">
                  <div className="stat place-items-center">
                    <div className="stat-title">Status</div>
                    <div className="stat-value text-xl text-success">
                      Active
                    </div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-title">Session</div>
                    <div className="stat-value text-xl text-[#2af4c2]">
                      Secure
                    </div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-title">User ID</div>
                    <div className="stat-value text-xl">{auth.user?.id}</div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="btn btn-error btn-lg w-full gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              // Not Authenticated State
              <div className="space-y-6">
                {/* Login Prompt */}
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center shrink-0">
                      <Shield className="w-12 h-12 opacity-40 shrink-0" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">
                    Authentication Required
                  </h2>
                  <p className="text-base-content/60 mb-8">
                    Please login to access your account
                  </p>
                </div>

                {/* Features List */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2af4c2]" />
                      What you'll get:
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="badge badge-sm bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30"></div>
                        <span className="text-sm">
                          Secure session management
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="badge badge-sm bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30"></div>
                        <span className="text-sm">Personalized experience</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="badge badge-sm bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30"></div>
                        <span className="text-sm">
                          Access to protected features
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  onClick={() =>
                    login({
                      id: "1",
                      name: "Olamide Olarewaju",
                      email: "olamide@example.com",
                    })
                  }
                  className="btn btn-lg w-full bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Login to Continue
                </button>

                <div className="alert">
                  <Shield className="w-5 h-5 text-[#2af4c2] flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">Demo Mode</p>
                    <p className="opacity-70">
                      This is a demonstration. Click login to simulate
                      authentication.
                    </p>
                  </div>
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
