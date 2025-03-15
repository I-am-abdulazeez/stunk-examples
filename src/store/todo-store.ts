import { chunk, computed } from "stunk";
import { Category, Todo } from "../types";
import { withHistory } from "stunk/middleware";

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


/* stats and filtered todos will be used by vanilla ts and js.
   React, Vue or any other framework should leverage on their bindings

   We use computed here because it is based on heavy calc
*/
export const stats = computed([todosChunk], (allTodos) => {
  return {
    total: allTodos.length,
    completed: allTodos.filter(todo => todo.completed).length,
    active: allTodos.filter(todo => !todo.completed).length
  };
});

// compute filtered todos with stunk computed -- We use computed here because it is based on multiple chunks.
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
