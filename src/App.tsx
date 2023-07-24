/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoUpdateProvider } from './context/context';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoUpdateProvider>
        <>
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </>
      </TodoUpdateProvider>
    </div>
  );
};
