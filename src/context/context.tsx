import React, { useState, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export const TodosContext = React.createContext([] as Todo[]);

interface TodoUpdate {
  toggleTodo: (id: number) => void,
  toggleAll: () => void,
  addTodo: (title: string) => void,
  updateTitle: (id: number, editedTitle: string) => void,
  removeTodo: (id: number) => void,
  removeCompletedTodo: () => void,
  onFilterChange: (filterStatus: FilterStatus) => void,
  countActiveTodo: () => number,
}

export const TodoUpdateContext = React.createContext({} as TodoUpdate);

type Props = {
  children: React.ReactNode;
};

function getFilteredTodo(todos: Todo[], filterStatus: FilterStatus) {
  return todos.filter((todo) => {
    switch (filterStatus) {
      case FilterStatus.ACTIVE:
        return !todo.completed;

      case FilterStatus.COMPLETED:
        return todo.completed;

      case FilterStatus.ALL:
      default:
        return todo;
    }
  });
}

export const TodoUpdateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);

  const filteredTodos = getFilteredTodo(todos, filterStatus);

  const countActiveTodo = () => (todos.reduce(
    ((acc, { completed }) => acc + +completed), 0,
  ));

  const toggleTodo = (id: number) => (
    setTodos((prevTodos) => (
      prevTodos.map((todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo))
    ))
  );

  const toggleAll = () => {
    const isEveryCompleted = todos.every(
      todo => todo.completed,
    );

    setTodos((prevTodos) => (
      prevTodos.map(todo => {
        return { ...todo, completed: !isEveryCompleted };
      })));
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTitle = (id: number, editedTitle: string) => (
    setTodos((prevTodos) => (prevTodos.map((prevTodo) => (
      prevTodo.id === id
        ? { ...prevTodo, title: editedTitle }
        : prevTodo))))
  );

  const removeTodo = (id: number) => (
    setTodos((prevTodos) => (
      prevTodos.filter((prevTodo) => prevTodo.id !== id)
    )));

  const removeCompletedTodo = () => (
    setTodos((prevTodos) => (
      prevTodos.filter((todo) => !todo.completed)
    ))
  );

  const updateValue = useMemo(() => ({
    toggleTodo,
    addTodo,
    updateTitle,
    removeTodo,
    removeCompletedTodo,
    onFilterChange: setFilterStatus,
    toggleAll,
    countActiveTodo,
  }),
  [todos, filterStatus]);

  return (
    <TodoUpdateContext.Provider value={updateValue}>
      <TodosContext.Provider value={filteredTodos}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
