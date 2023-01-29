import { useState } from 'react';
import { ITodo } from '../../interfaces/interface';
import CreateTodoField from '../CreateTodoField/CreateTodoField';
import TodoItem from '../TodoItem/TodoItem';
import styles from './app.module.css';

function App() {
  const [todoItems, setTodoItems] = useState(todos);

  function handleCompleted(id: number): void {
    const newTodoItems = todoItems.map((todo) => {
      if (id === todo.id) return { ...todo, isCompleted: !todo.isCompleted };
      return todo;
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
        todoItems.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo} 
            changeTodo={handleCompleted}
            removeTodo={removeTodo}
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
