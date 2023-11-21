import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence mode='wait'>
        {todoItems.length > 0
          ? (
              <AnimatePresence>
                {todoItems.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo} 
                    moveToCompleted={moveToCompleted}
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
