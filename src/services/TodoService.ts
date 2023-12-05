import { toast } from 'react-toastify';

import { ITodo } from '../interfaces/interface';
import axios from './utils/axios';

class TodoService {
  public async getAllTodo() {
    try {
      const response = await axios.get('/all');
      const todos = response.data;
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  public async createTodo(currTitleTodo: string) {
    try {
      const response = await axios.post('/create', {
        title: currTitleTodo,
        isCompleted: false,
      });
      const newTodo = response.data;
      return newTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  public async updateTodoTitle(id: number, currTitleTodo: string) {
    try {
      const response = await axios.patch(`/update/${id}`, {
        title: currTitleTodo,
      })
      const updatedTodo = response.data;
      return updatedTodo;
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  }

  public async updateTodoStatus(id: number, updatedTodo: ITodo) {
    try {
      axios.patch(`/update/${id}`, {
        isCompleted: updatedTodo.isCompleted,
      })
    } catch (error) {
      console.error('Error updating status todo:', error);
    }
  }

  public async deleteTodo(id: number) {
    try {
      await axios.delete(`/remove/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      })
    } catch {
      toast.error('Failed to delete todo!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }
}

export default new TodoService() as TodoService;
