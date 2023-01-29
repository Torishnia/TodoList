import { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';

import { IPropsForCreateTodoField } from '../../interfaces/interface';
import styles  from './create-todo-field.module.css';

function CreateTodoField(props: IPropsForCreateTodoField) {
const { todoItems, setTodoItems } = props;
const [title, setTitle] = useState('');
const sizeBtn = 22;

function addTodo(title: string): void {
  if (!title.trim()) return;
  setTodoItems([
    {
      id: +new Date(),
      title,
      isCompleted: false,
    },
    ...todoItems, 
  ]);
  emptyInput();
}

function emptyInput(): void {
  setTitle('');
}

  return (
    <div className={styles.container}>
      <div className={styles.leftPart}>
        <input 
          className={styles.input}
          type='text'
          onChange={event => setTitle(event.target.value)}
          value={title}
          onKeyPress={event => event.key === 'Enter' && addTodo(title)}
          placeholder='Add a task'
        />
      </div>
      <div className={styles.rightPart}>
        <div className={styles.saveBtn}>
          <button onClick={() => addTodo(title)}>
            <HiOutlinePlusCircle size={sizeBtn + 5} />
          </button>
        </div>
        <div className={styles.cancelBtn}>
          <button onClick={() => emptyInput()}>
            <ImCancelCircle size={sizeBtn} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTodoField;
