import React from 'react';
import TodoItem from './components/TodoItem';
import { ITodo } from './interface';

function App() {
  return (
    <div className = 'bg-gray-900 h-screen text-white'>
      { 
        todos.map(todo => (
          <TodoItem
            key = { todo.id }
            todo = { todo } 
          />
        ))
      }
    </div>
  );
}

let todos: ITodo[];

todos = [
  { 
    id: 1,
    title: 'Finish the essay collaboration', 
    isCompleted: false 
  },
  { 
    id: 2,
    title: 'Read next chapter of the book', 
    isCompleted: false 
  },
  { 
    id: 3,
    title: 'Send the finished assignment', 
    isCompleted: false 
  },
];

export default App;
