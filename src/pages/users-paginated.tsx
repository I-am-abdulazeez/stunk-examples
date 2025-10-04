import { useAsyncChunk } from "stunk/react";

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
    <div className="p-4 max-w-4xl mx-auto">
      <Heading text="Users with Pagination" />

      {/* Page Size Selector */}
      <div className="mb-4 flex items-center gap-2">
        <label className="label">
          <span className="label-text">Users per page:</span>
        </label>
        <select
          className="select select-bordered select-sm w-24"
          value={currentPageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          disabled={loading}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <button
          onClick={handleRefresh}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <span className="ml-2 text-lg">Loading users...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error.message}</span>
        </div>
      )}

      {/* Users List */}
      {!loading && data && data.users.length > 0 && (
        <div className="space-y-4">
          {/* Pagination Info */}
          <div className="text-sm text-base-content/70 mb-4">
            Showing {(currentPage - 1) * currentPageSize + 1} to{" "}
            {Math.min(currentPage * currentPageSize, data.totalUsers)} of{" "}
            {data.totalUsers} users
          </div>

          {/* Users Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.users.map((user) => (
              <div key={user.id} className="card bg-base-200 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-semibold   text-sm truncate">
                        {user.name}
                      </h3>
                      <p className="text-xs text-base-content/70 truncate">
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
              {/* Previous Button */}
              <button
                className={`join-item btn ${
                  !data.hasPrevPage ? "btn-disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!data.hasPrevPage || loading}
              >
                « Prev
              </button>

              {/* Page Numbers */}
              {generatePageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  className={`join-item btn ${
                    currentPage === pageNum ? "btn-active btn-primary" : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                className={`join-item btn ${
                  !data.hasNextPage ? "btn-disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!data.hasNextPage || loading}
              >
                Next »
              </button>
            </div>
          </div>

          {/* Pagination Summary */}
          <div className="text-center text-sm text-base-content/70 mt-4">
            Page {currentPage} of {data.totalPages}
          </div>
        </div>
      )}

      {/* No Data State */}
      {!loading && data && data.users.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No users found</h3>
          <p className="text-base-content/70">
            Try refreshing the page or adjusting your search.
          </p>
        </div>
      )}

      <GoBack />
    </div>
  );
}
