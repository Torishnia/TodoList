import { HiOutlinePlusCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';

import { IPropsForCreateTodoField } from '../../interfaces/interface';
import styles  from './create-todo-field.module.css';

function CreateTodoField(props: IPropsForCreateTodoField) {
const {
  currTitleTodo,
  setCurrTitleTodo,
  editIdTodo,
  setEditIdTodo,
  todoItems,
  setTodoItems,
 } = props;
const sizeBtn = 22;

function createOrUpdateTodo(): void {
  if (!currTitleTodo.trim()) return;

  const todoForSave = {
    id: editIdTodo || +new Date(),
    title: currTitleTodo,
    isCompleted: false,
  };

  const todoListForSave = editIdTodo
    ? [todoForSave, ...todoItems.filter((item) => item.id !== editIdTodo)]
    : [todoForSave, ...todoItems];

  setTodoItems(todoListForSave);
  emptyInput();

  // Saving todo in localStorage when todoItems change
  localStorage.setItem('todoItems', JSON.stringify(todoListForSave));
}

function emptyInput(): void {
  setCurrTitleTodo('');
  setEditIdTodo(null);
}

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
  const { key } = event;
  if (key !== "Enter") return;
  createOrUpdateTodo();
}

  return (
    // Creating or Updating Input 
    <div className={styles.container}>

      {/* Input Field */}
      <div className={styles.leftPart}>
        <input 
          className={styles.input}
          type='text'
          onChange={event => setCurrTitleTodo(event.target.value)}
          value={currTitleTodo}
          onKeyDown={handleKeyPress}
          placeholder='Add a task'
        />
      </div>

      {/* Process btns */}
      <div className={styles.rightPart}>

        {/* Add / Update btn */}
        <div className={styles.saveBtn}>
          <button onClick={createOrUpdateTodo}>
            {
              editIdTodo
                ? <HiOutlineCheckCircle size={sizeBtn + 5} />
                : <HiOutlinePlusCircle size={sizeBtn + 5} />
            }
          </button>
        </div>

        {/* Cancel btn */}
        <div className={styles.cancelBtn}>
          <button onClick={emptyInput}>
            <ImCancelCircle size={sizeBtn} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTodoField;
