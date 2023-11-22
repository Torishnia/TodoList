import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import { ITodo } from '../../interfaces/interface';
import styles from './app.module.css';


function App() {
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
  const [currTitleTodo, setCurrTitleTodo] = useState<string>('');
  const [editIdTodo, setEditIdTodo] = useState<number | null>(null);

  // Loading todo from localStorage when mounting component
  useEffect(() => {
    const storedUserTodos = localStorage.getItem('todoItems');

    if (storedUserTodos) {
      const parsedTodos = JSON.parse(storedUserTodos);
      setTodoItems(parsedTodos);
    }
  }, [])

  function handleComplete(id: number): void {
    const result = todoItems.map((todo) => {
      if (id !== todo.id) return todo;
      return { ...todo, isCompleted: !todo.isCompleted };
    });
    setTodoItems(result);

    // Update todoItems in localStorage
    localStorage.setItem('todoItems', JSON.stringify(result));
  }

  function editTodo(id: number): void {
    const itemForEdit = todoItems.find((item) => item.id === id);
    if (!itemForEdit) return;
    
    setEditIdTodo(itemForEdit.id);
    setCurrTitleTodo(itemForEdit.title);
  }

  function removeTodo(id: number): void {
    const result = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(result);

    // Update todoItems in localStorage
    localStorage.setItem('todoItems', JSON.stringify(result));
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
      <AnimatePresence mode='wait'>
        {todoItems.length > 0
          ? (
              <AnimatePresence>
                {todoItems.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo} 
                    handleComplete={handleComplete}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    editIdTodo={editIdTodo}
                  />
                ))}
              </AnimatePresence>
            )
          : <motion.p
              key='fallback'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{textAlign: 'center'}}
            >
              No todos found.
            </motion.p>
        }
      </AnimatePresence>

    </div>
  );
}

export default App;
