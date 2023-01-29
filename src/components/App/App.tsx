import { useState } from 'react';

import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import { todos } from '../../data';
import styles from './app.module.css';

function App() {
  const [todoItems, setTodoItems] = useState(todos);

  function moveToCompleted(id: number): void {
    const newTodoItems = todoItems.map((todo) => {
      if (id !== todo.id) return todo;
      return { ...todo, isCompleted: !todo.isCompleted };
    });
    setTodoItems(newTodoItems);
  }

  function removeTodo(id: number): void {
    const newTodoItem = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodoItem);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>
      <CreateTodoField 
        setTodoItems={setTodoItems} 
        todoItems={todoItems}
      />
      { 
        todoItems.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo} 
            moveToCompleted={moveToCompleted}
            removeTodo={removeTodo}
          />
        ))
      }
    </div>
  );
}

export default App;
