import { IPropsForTodoItem } from '../../interfaces/interface';
import Check from '../Check/Check';
import styles from './todoItem.module.css';

function TodoItem(props: IPropsForTodoItem) {
  const { todo, changeTodo } = props;
  
  return ( 
    <div className={styles.container}>
      <div className={styles.check}>
        <button onClick={() => changeTodo(todo.id)}>
          <Check todo={todo} />
        </button>
      </div>
      <div className={ todo.isCompleted ? styles.isOn : styles.isOff}>
        <span>{ todo.title }</span>
      </div>
    </div>
  )
}

export default TodoItem

