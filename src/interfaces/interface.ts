export interface IPropsTodo {
  todo: ITodo;
}

export interface IPropsForTodoItem extends IPropsTodo {
  removeTodo: Function;
  changeTodo: Function;
}

export interface IPropsForCheck extends IPropsTodo {
}

export interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
}