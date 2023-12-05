import { HiOutlinePlusCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';

import { IPropsForCreateTodoField, ITodo } from '../../interfaces/interface';
import TodoService from '../../services/TodoService';
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

async function createTodo() {
  if (!currTitleTodo.trim()) return;
  const newTodo = await TodoService.createTodo(currTitleTodo);

  setTodoItems((prevItems: ITodo[]) => [newTodo, ...prevItems]);
  setCurrTitleTodo('');
  emptyInput();
}

async function updateTodoTitle(id: number) {
  if (!currTitleTodo.trim()) return;
  const updatedTodo = await TodoService.updateTodoTitle(id, currTitleTodo);
  const result = [updatedTodo, ...todoItems.filter((item) => item._id !== editIdTodo)];

  setTodoItems(result);
  emptyInput();
}

function emptyInput(): void {
  setCurrTitleTodo('');
  setEditIdTodo(null);
}

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
  const { key } = event;
  if (key !== "Enter") return;
  if (editIdTodo) {
    updateTodoTitle(editIdTodo);
  } else {
    createTodo();
  }
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
          {!editIdTodo
            ? <button onClick={createTodo}><HiOutlinePlusCircle size={sizeBtn + 5} /></button>
            : <button onClick={() => updateTodoTitle(editIdTodo)}><HiOutlineCheckCircle size={sizeBtn + 5} /></button>
          }
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
