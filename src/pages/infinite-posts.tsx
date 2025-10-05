import { useInfiniteAsyncChunk } from "stunk/react";
import { infinitePostsChunk, Post } from "@/store/infinite-posts-store";
import Heading from "@/components/shared/heading";
import GoBack from "@/components/shared/go-back";

export default function InfiniteScrollPosts() {
  const {
    data,
    loading,
    error,
    hasMore,
    isFetchingMore,
    observerTarget,
    resetPagination,
  } = useInfiniteAsyncChunk(infinitePostsChunk);

  const isInitialLoading = loading && !isFetchingMore;

  return (
    <div className="p-4 max-w-4xl mx-auto h-[80vh] flex flex-col">
      <Heading text="Infinite Scroll Posts" />

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-base-content/70">
          {data?.length || 0} posts loaded
        </div>
        <button
          onClick={resetPagination}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {/* Main scrollable container */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4">
        {/* Initial Loading */}
        {isInitialLoading && (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="ml-2 text-lg">Loading posts...</span>
          </div>
        )}

        {/* Error */}
        {error && !isInitialLoading && (
          <div className="alert alert-error mb-4">
            <span>Error: {error.message}</span>
          </div>
        )}

        {/* Posts */}
        {!isInitialLoading &&
          data?.map((post: Post) => (
            <div key={post.id} className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg">{post.title}</h2>
                <p className="text-sm text-base-content/70">{post.body}</p>
                <div className="card-actions justify-end">
                  <span className="text-xs text-base-content/60">
                    By {post.author}
                  </span>
                </div>
              </div>
            </div>
          ))}

        {/* Fetching more (infinite scroll) */}
        {isFetchingMore && (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Observer Target */}
        {hasMore && <div ref={observerTarget} className="h-20" />}

        {/* End of list */}
        {!loading && !hasMore && data && data.length > 0 && (
          <div className="text-center py-8">
            <p className="text-base-content/70">You've reached the end!</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && (!data || data.length === 0) && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-base-content/70">
              Check back later for new content.
            </p>
          </div>
        )}
      </div>

      <GoBack />
    </div>
  );
}
