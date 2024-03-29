export interface IPropsTodo {
  todo: ITodo;
}

export interface IPropsForTodoItem extends IPropsTodo {
  removeTodo: Function;
  handleComplete: Function;
  editTodo: Function;
  editIdTodo: number | null;
}

export interface IPropsForCheck extends IPropsTodo {
}

export interface IPropsForCreateTodoField {
  setTodoItems: Function;
  todoItems: ITodo[];
  currTitleTodo: string;
  editIdTodo: number | null;
  setCurrTitleTodo: Function;
  setEditIdTodo: Function;
}

export interface ITodo {
  _id: number;
  title: string;
  isCompleted: boolean;
}
