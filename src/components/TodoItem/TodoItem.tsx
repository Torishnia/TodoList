import { IPropsForTodoItem } from '../../interfaces/interface';
import Check from '../Check/Check';
import styles from './todoItem.module.css';

function TodoItem(props: IPropsForTodoItem) {
  const { todo } = props;
  
  return ( 
    <div className={styles.container}>
      <div className={styles.check}>
        <Check todo={todo}/>
      </div>
      <div>
        <span>{ todo.title }</span>
      </div>
    </div>
  )
}

export default TodoItem