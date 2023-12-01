import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import { ITodo } from '../../interfaces/interface';
import styles from './app.module.css';


function App() {
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
  const [currTitleTodo, setCurrTitleTodo] = useState<string>('');
  const [editIdTodo, setEditIdTodo] = useState<number | null>(null);

  useEffect(() => {
    async function getAllTodo() {
      try {
        const response = await axios.get('https://todo-list-api-vercel-iota.vercel.app/all');
        const todos = response.data;
        setTodoItems(todos);
        
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    getAllTodo();
  },[])

  function handleComplete(id: number): void {
    const updatedTodoItems = todoItems.map((todo) => {
      if (id !== todo._id) return todo;
  
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
  
      axios.patch(`https://todo-list-api-vercel-iota.vercel.app/update/${id}`, {
        isCompleted: updatedTodo.isCompleted,
      })
  
      return updatedTodo;
    });

    setTodoItems(updatedTodoItems);
  }

  function editTodo(id: number) {
    const itemForEdit = todoItems.find((item) => item._id === id);
    if (!itemForEdit) return;
    
    setEditIdTodo(itemForEdit._id);
    setCurrTitleTodo(itemForEdit.title);
  }

  async function removeTodo(id: number) {
    await axios.delete(`https://todo-list-api-vercel-iota.vercel.app/remove/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          const result = todoItems.filter((todo) => todo._id !== id);
          setTodoItems(result);
        }
      })
      .catch();
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
                <div className={styles.content_todo}>
                  {todoItems.map((todo) => (
                    <TodoItem
                      key={todo._id}
                      todo={todo} 
                      handleComplete={handleComplete}
                      removeTodo={removeTodo}
                      editTodo={editTodo}
                      editIdTodo={editIdTodo}
                    />
                  ))}
                </div>
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
