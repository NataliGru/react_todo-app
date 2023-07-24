import { useContext, useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoUpdateContext } from '../context/context';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const { toggleTodo, updateTitle, removeTodo } = useContext(TodoUpdateContext);

  const handleUpdateTitle = (editedTitle: string) => {
    const normalizedTitle = editedTitle.trim();

    if (normalizedTitle === todo.title) {
      return;
    }

    if (!normalizedTitle.length) {
      removeTodo(todo.id);
    }

    updateTitle(todo.id, normalizedTitle);
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      handleUpdateTitle(editTitle);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-completed"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>

        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editTitle}
          onChange={(event) => handleUpdateTitle(event.target.value)}
          onKeyDown={onKeyDown}
          // onBlur={}
        />
      )}

    </li>

  );
};
