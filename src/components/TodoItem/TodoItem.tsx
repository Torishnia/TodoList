import { GoTrashcan } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Check from '../Check/Check';
import { IPropsForTodoItem } from '../../interfaces/interface';
import styles from './todoItem.module.css';

function TodoItem(props: IPropsForTodoItem) {
  const { todo, handleComplete, removeTodo, editTodo, editIdTodo } = props;
  const { _id, title, isCompleted } = todo;
  const sizeForIcon = 22;
  
  return (
    // Todo Item component
    <motion.div
      layout
      exit={{ y: -30, opacity: 0 }}
      className={`
        ${styles.container} 
        ${editIdTodo === todo._id ? styles.container_border : ''}
      `}
    >
      <div className={styles.leftPart}>

        {/* Checkbox for completed */}
        <div className={styles.check}>
          <button onClick={() => handleComplete(_id)}>
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
          <button onClick={() => editTodo(_id)}>
            <FiEdit size={sizeForIcon} />
          </button>
        </div>

        {/* Delete btn */}
        <div className={styles.trash}>
          <button onClick={() => removeTodo(_id)}>
            <GoTrashcan size={sizeForIcon} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TodoItem;
