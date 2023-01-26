export interface IPropsForTodoItem {
  todo: ITodo;
}

export interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
}