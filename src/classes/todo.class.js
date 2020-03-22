export class Todo {

    ///// Convertimos lods todos provenientges del json en instancias de la clase TODO, de nuevo ////
    static fromJson({ task, id, complete, created }) {
        const tempTodo = new Todo(task);
        tempTodo.id = id;
        tempTodo.complete = complete;
        tempTodo.created = created;
        return tempTodo;
    }
    constructor(task){

        this.task = task;

        this.id = new Date().getTime();

        this.complete = false;

        this.created = new Date();

    }
    
}

