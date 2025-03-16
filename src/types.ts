export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  categoryId: string;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
}

export type isAuth = { user: User | null; isAuthenticated: boolean }
