import { useContext } from 'react';
import { TodosContext } from '../context/context';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const todos = useContext(TodosContext);

  return (
    <section className="main">
      <ul className="todo-list" data-cy="todoList">
        {
          todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </ul>
    </section>
  );
};
