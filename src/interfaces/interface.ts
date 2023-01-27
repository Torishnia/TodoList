export interface IPropsTodo {
  todo: ITodo;
}

export interface IPropsForTodoItem extends IPropsTodo {}

export interface IPropsForCheck extends IPropsTodo {}

export interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
}