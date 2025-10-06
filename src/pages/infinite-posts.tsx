import { useInfiniteAsyncChunk } from "stunk/react";
import {
  Infinity,
  RotateCcw,
  FileText,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

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
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Heading text="Infinite Scroll" />

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-0">
            {/* Header */}
            <div className="p-4 border-b border-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Infinity className="w-6 h-6 text-[#2af4c2]" />
                  <div>
                    <h2 className="text-2xl font-bold">Post Feed</h2>
                    <p className="text-sm opacity-60">
                      {data?.length || 0} posts loaded
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetPagination}
                  className="btn btn-outline btn-sm gap-2"
                  disabled={loading}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-4 h-[600px]">
              {/* Initial Loading */}
              {isInitialLoading && (
                <div className="flex flex-col items-center gap-6 py-12">
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <span className="loading loading-spinner loading-lg text-[#2af4c2]"></span>
                    <div className="absolute inset-0 bg-[#2af4c2] opacity-20 blur-xl rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold mb-2">
                      Loading posts...
                    </p>
                    <p className="text-sm opacity-60">Please wait a moment</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && !isInitialLoading && (
                <div className="alert alert-error mb-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Failed to load posts</p>
                    <p className="text-sm opacity-90">{error.message}</p>
                  </div>
                </div>
              )}

              {/* Posts */}
              {!isInitialLoading && (
                <div className="space-y-4">
                  {data?.map((post: Post) => (
                    <div
                      key={post.id}
                      className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-colors"
                    >
                      <div className="card-body p-4 text-left">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-[#2af4c2]/10">
                            <FileText className="w-5 h-5 text-[#2af4c2]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm opacity-70 leading-relaxed">
                              {post.body}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-base-300">
                          <div className="flex items-center gap-2 text-sm opacity-60">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="badge badge-sm badge-ghost">
                            ID: {post.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fetching More */}
              {isFetchingMore && (
                <div className="flex flex-col items-center gap-4 py-8">
                  <span className="loading loading-spinner loading-lg text-[#2af4c2]"></span>
                  <p className="text-sm opacity-60">Loading more posts...</p>
                </div>
              )}

              {/* Observer Target */}
              {hasMore && <div ref={observerTarget} className="h-20" />}

              {/* End of List */}
              {!loading && !hasMore && data && data.length > 0 && (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-success/10">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                  </div>
                  <p className="font-semibold mb-1">All caught up!</p>
                  <p className="text-sm opacity-60">
                    You've reached the end of the feed
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!loading && (!data || data.length === 0) && (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center">
                      <FileText className="w-12 h-12 opacity-40" />
                    </div>
                  </div>
                  <p className="text-xl font-semibold mb-2">No posts yet</p>
                  <p className="text-sm opacity-60">
                    Check back later for new content
                  </p>
                </div>
              )}
            </div>

            {/* Status Bar */}
            {data && data.length > 0 && (
              <div className="p-3 border-t border-base-300">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <div
                    className={`badge badge-sm ${
                      hasMore ? "badge-info" : "badge-success"
                    }`}
                  >
                    {hasMore ? "Loading on scroll" : "All loaded"}
                  </div>
                  {isFetchingMore && (
                    <span className="opacity-60">Fetching...</span>
                  )}
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
