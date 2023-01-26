import { IPropsForTodoItem } from '../interface'

function TodoItem(props: IPropsForTodoItem) {
  const { todo: { title } } = props;
  
  return ( 
    <div>{ title }</div>
  )
}

export default TodoItem