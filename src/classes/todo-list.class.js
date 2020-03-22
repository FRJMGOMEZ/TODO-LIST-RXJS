

export class TodoList{
    
    constructor(){
        this.todos=[]
    }

    add(todo){
        this.todos.push(todo);
    }

    remove(todoId){
        let todoDeleted = this.todos.filter(eachTodo => eachTodo.id === Number(todoId))[0];
        this.todos = this.todos.filter((todo)=>{ return todo.id != todoId})
    }

    toggleTodo(todoId){
        let todo = this.todos.filter((eachTodo)=>{return eachTodo.id === Number(todoId)})[0];
        this.todos[this.todos.indexOf(todo)].complete = this.todos[this.todos.indexOf(todo)].complete ? false:true;
        return this.todos[this.todos.indexOf(todo)]
    }

    removeCompleted(){
        this.todos = this.todos.filter((todo)=>{return !todo.complete})
    }
    
    
}