import { Todo } from './Todo';

export type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};
