import { useState } from 'react';
import { ITodo } from '../../interfaces/interface';
import TodoItem from '../TodoItem/TodoItem';
import styles from './app.module.css';

function App() {
  const [todoItems, setTodoItems] = useState(todos);

  function handleCompleted(id: number): void {
    console.log('id: ', id);
    
    const newTodoItems = todoItems.map((todo) => {
      if (id === todo.id) {
        const qwe = { ...todo, isCompleted: !todo.isCompleted };
        console.log('todo: ', qwe);
        return qwe;
      }
      return todo;
    });
    setTodoItems(newTodoItems);
  }

  return (
    <div style={{color: 'rgb(255 255 255)'}}>
      <h1 className = {styles.title}>Tasks</h1>
      { 
        todoItems.map(todo => (
          <TodoItem
            key = { todo.id }
            todo = { todo } 
            changeTodo={handleCompleted}
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
