import { chunk } from "stunk";
import { withPersistence } from "stunk/middleware";

type User = {
  id: string;
  name: string;
  email: string;
}

type Auth = { user: User | null; isAuthenticated: boolean, loading: boolean }

export const authChunk = withPersistence(
  chunk<Auth>({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
  { key: "auth" }
);

export const login = async (user: User) => {
  authChunk.set((prev) => ({ ...prev, loading: true }));
  await new Promise((resolve) => setTimeout(resolve, 1500));
  authChunk.set({ user, isAuthenticated: true, loading: false });
};

export const logout = async () => {
  authChunk.set((prev) => ({ ...prev, loading: true }));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  authChunk.set({ user: null, isAuthenticated: false, loading: false });
};
