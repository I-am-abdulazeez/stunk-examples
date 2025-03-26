import { chunk, computed } from "stunk";
import { withHistory } from "stunk/middleware";


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

export const todosChunk = withHistory(chunk<Todo[]>([]));
export const categoriesChunk = chunk<Category[]>([
  { id: '1', name: 'Personal' },
  { id: '2', name: 'Work' },
  { id: '3', name: 'Shopping' }
]);
export const newTodoChunk = chunk('');
export const selectedCategoryChunk = chunk('1');
export const newCategoryChunk = chunk('');
export const showCategoryFormChunk = chunk(false);
export const filterChunk = chunk('all');


export const stats = todosChunk.derive((allTodos) => {
  return {
    total: allTodos.length,
    completed: allTodos.filter(todo => todo.completed).length,
    active: allTodos.filter(todo => !todo.completed).length
  };
});

export const filteredTodos = computed([todosChunk, filterChunk], (allTodos, currentFilter) => {
  if (currentFilter === 'all') return allTodos;
  if (currentFilter === 'completed') return allTodos.filter(todo => todo.completed);
  if (currentFilter === 'active') return allTodos.filter(todo => !todo.completed);
  if (currentFilter.startsWith('category-')) {
    const categoryId = currentFilter.replace('category-', '');
    return allTodos.filter(todo => todo.categoryId === categoryId);
  }
  return allTodos;
});
