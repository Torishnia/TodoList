import { GoTrashcan } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';

import Check from '../Check/Check';
import styles from './todoItem.module.css';
import { IPropsForTodoItem } from '../../interfaces/interface';

function TodoItem(props: IPropsForTodoItem) {
  const { todo, moveToCompleted, removeTodo } = props;
  const { id, title, isCompleted } = todo;
  const sizeForIcon = 22;
  
  return ( 
    <div className={styles.container}>
      <div className={styles.leftPart}>
        <div className={styles.check}>
          <button onClick={() => moveToCompleted(id)}>
            <Check todo={todo} />
          </button>
        </div>
        <div className={ isCompleted ? styles.isOn : styles.isOff}>
          <span>{ title }</span>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.edit}>
          <button onClick={() => alert('Slava Ukraine')}>
            <FiEdit size={sizeForIcon} />
          </button>
        </div>
        <div className={styles.trash}>
          <button onClick={() => removeTodo(id)}>
            <GoTrashcan size={sizeForIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem;
