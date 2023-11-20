import { useState } from 'react';

import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import { todos } from '../../data';
import styles from './app.module.css';

function App() {
  const [todoItems, setTodoItems] = useState(todos);
  const [currTitleTodo, setCurrTitleTodo] = useState<string>('');
  const [editIdTodo, setEditIdTodo] = useState<number | null>(null);

  function moveToCompleted(id: number): void {
    const newTodoItems = todoItems.map((todo) => {
      if (id !== todo.id) return todo;
      return { ...todo, isCompleted: !todo.isCompleted };
    });
    setTodoItems(newTodoItems);
  }

  function editTodo(id: number): void {
    const itemForEdit = todoItems.find((item) => item.id === id);
    if (!itemForEdit) return;
    
    setEditIdTodo(itemForEdit.id);
    setCurrTitleTodo(itemForEdit.title);
  }

  function removeTodo(id: number): void {
    const newTodoItem = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodoItem);
  }

  return (
    // Main Container
    <div className={styles.container}>
      
      {/* Header Field */}
      <h1 className={styles.title}>Tasks</h1>
      
      {/* Input Component */}
      <CreateTodoField 
        setTodoItems={setTodoItems} 
        todoItems={todoItems}
        editIdTodo={editIdTodo}
        currTitleTodo={currTitleTodo}
        setCurrTitleTodo={setCurrTitleTodo}
        setEditIdTodo={setEditIdTodo}
      />

      {/* Result Todos Component */}
      { 
        todoItems.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo} 
            moveToCompleted={moveToCompleted}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        ))
      }

    </div>
  );
}

export default App;
