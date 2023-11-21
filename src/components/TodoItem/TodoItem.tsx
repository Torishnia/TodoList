import { GoTrashcan } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';

import Check from '../Check/Check';
import { IPropsForTodoItem } from '../../interfaces/interface';
import styles from './todoItem.module.css';

function TodoItem(props: IPropsForTodoItem) {
  const { todo, moveToCompleted, removeTodo, editTodo, editIdTodo } = props;
  const { id, title, isCompleted } = todo;
  const sizeForIcon = 22;
  
  return (
    // Todo Item component
    <div className={`${styles.container} ${editIdTodo === todo.id ? styles.container_border : ''}`}>
      <div className={styles.leftPart}>

        {/* Checkbox for completed */}
        <div className={styles.check}>
          <button onClick={() => moveToCompleted(id)}>
            <Check todo={todo} />
          </button>
        </div>

        {/* Title */}
        <div className={ isCompleted ? styles.isOn : styles.isOff}>
          <span>{ title }</span>
        </div>

      </div>

      {/* Process btns */}
      <div className={styles.rightPart}>
        
        {/* Edit btn */}
        <div className={styles.edit}>
          <button onClick={() => editTodo(id)}>
            <FiEdit size={sizeForIcon} />
          </button>
        </div>

        {/* Delete btn */}
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
