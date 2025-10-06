import { useAsyncChunk } from "stunk/react";
import {
  Users,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Settings,
} from "lucide-react";

import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";
import { paginatedUsersChunk } from "@/store/paginated-store";

export default function PaginatedUserList() {
  const { data, loading, error, reload, setParams } = useAsyncChunk(
    paginatedUsersChunk,
    {
      initialParams: { page: 1, pageSize: 10 }, // Initial page and page size - This is intentional, because we want you to be specific about it...
    }
  );

  // Extract current values from data
  const currentPage = data?.currentPage || 1;
  const currentPageSize = data?.pageSize || 5;

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage, pageSize: currentPageSize });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setParams({ page: 1, pageSize: newPageSize });
  };

  const handleRefresh = () => {
    reload();
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!data) return [];

    const { totalPages } = data;
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <Heading text="Paginated Users" />

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#2af4c2]" />
                <div>
                  <h2 className="text-2xl font-bold">User Directory</h2>
                  {data && (
                    <p className="text-sm text-left opacity-60">
                      {data.totalUsers} total users
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 opacity-60" />
                  <select
                    className="select select-bordered select-sm"
                    value={currentPageSize}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    disabled={loading}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={15}>15 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>

                <button
                  onClick={handleRefresh}
                  className="btn btn-outline btn-sm gap-2"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>
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

            {/* Users List */}
            {!loading && data && data.users.length > 0 && (
              <div className="space-y-6">
                {/* Pagination Info */}
                <div className="flex justify-between items-center">
                  <div className="text-sm opacity-70">
                    Showing {(currentPage - 1) * currentPageSize + 1} to{" "}
                    {Math.min(currentPage * currentPageSize, data.totalUsers)}{" "}
                    of {data.totalUsers} users
                  </div>
                  <div className="badge badge-lg bg-[#2af4c2]/20 text-[#2af4c2] border-[#2af4c2]/30">
                    Page {currentPage} of {data.totalPages}
                  </div>
                </div>

                {/* Users Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.users.map((user) => (
                    <div
                      key={user.id}
                      className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-colors"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring ring-[#2af4c2] ring-offset-base-100 ring-offset-2">
                              <img src={user.avatar} alt={user.name} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base truncate flex items-center gap-2">
                              {user.name}
                            </h3>
                            <p className="text-xs opacity-60 truncate flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="join">
                    <button
                      className="join-item btn btn-sm gap-1"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!data.hasPrevPage || loading}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>

                    {generatePageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`join-item btn btn-sm ${
                          currentPage === pageNum
                            ? "bg-[#2af4c2] hover:bg-[#24d4a8] border-[#2af4c2] text-neutral-900"
                            : ""
                        }`}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      className="join-item btn btn-sm gap-1"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!data.hasNextPage || loading}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* No Data State */}
            {!loading && data && data.users.length === 0 && (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center">
                    <Users className="w-12 h-12 opacity-40" />
                  </div>
                </div>
                <p className="text-xl font-semibold mb-2">No users found</p>
                <p className="text-sm opacity-60">
                  Try refreshing the page or adjusting your filters
                </p>
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
