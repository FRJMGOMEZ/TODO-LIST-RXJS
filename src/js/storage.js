
import { Todo } from '../classes/todo.class'
export const getTodos = () => {
    let todos = JSON.parse(localStorage.getItem('TODOS')) || [];
    todos = todos.map(Todo.fromJson);

    return todos;
}

export const setTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    if (!todos) {
        localStorage.setItem('TODOS', JSON.stringify([todo]))
    } else {
      todos.push(todo)
     localStorage.setItem('TODOS', JSON.stringify(todos))
    }
}

export const replaceTodo = (todo)=>{
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    todos.forEach((eachTodo,index)=>{
        if(eachTodo.id == todo.id){
          todos[index] = todo;
        }
    })
    localStorage.setItem('TODOS', JSON.stringify(todos))
}

export const removeTodo = (todoId)=>{
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    todos = todos.filter((eachTodo)=>{ return todoId != eachTodo.id})
    localStorage.setItem('TODOS', JSON.stringify(todos))
}



