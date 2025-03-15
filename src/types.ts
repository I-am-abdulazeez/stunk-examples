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
