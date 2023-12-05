import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import { ITodo } from '../../interfaces/interface';
import TodoService from '../../services/TodoService';
import styles from './app.module.css';

function App() {
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
  const [currTitleTodo, setCurrTitleTodo] = useState<string>('');
  const [editIdTodo, setEditIdTodo] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllTodo() {
      const todos =  await TodoService.getAllTodo();
      setTodoItems(todos);
      setIsLoading(false);
    }

    getAllTodo();
  },[])

  function handleComplete(id: number): void {
    const updatedTodoItems = todoItems.map((todo) => {
      if (id !== todo._id) return todo;
  
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
  
      TodoService.updateTodoStatus(id, updatedTodo);
  
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
    await TodoService.deleteTodo(id);
    const result = todoItems.filter((todo) => todo._id !== id);

    setTodoItems(result);
  }

  return (
    // Main Container
    <div className={styles.container}>
      <ToastContainer/>
      
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
      {isLoading
        ? <DotLoader color="#f472b6" cssOverride={{margin: '0 auto'}} />
        : ( 
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
          )
      }
    </div>
  );
}

export default App;
