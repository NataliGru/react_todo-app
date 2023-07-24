import { useContext, FormEvent, useState } from 'react';
import { TodoUpdateContext, TodosContext } from '../context/context';

export const TodoHeader: React.FC = () => {
  const {
    addTodo,
    toggleAll,
  } = useContext(TodoUpdateContext);

  const todos = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    title.trim();

    if (!title) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>

      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={toggleAll}
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all" />
        </>
      )}
    </header>
  );
};
