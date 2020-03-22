import './styles.css'
import { Todo, TodoList } from './classes/index';
import { createTodoHtml, toggleTaskHtml, removeTaskHmtl, removeAllTasksHtml, renderActiveTasksCount, renderFilterClass } from './js/render';
import {getTodos,setTodo,replaceTodo,removeTodo} from './js/storage';
import { fromEvent, Subject } from 'rxjs';
import { pluck, filter, tap } from 'rxjs/operators'


(() => {

    const todoList = new TodoList();

    let taskFilter = '';

    const retrieveStorageTodos = ()=>{
        let todos = getTodos();
        todos.forEach((todo)=>{
            if(!todo.complete){
                renderActiveTasksCount(1);
            }
            createNewTodo(todo);
        })
    }

    const createNewTodo = (newTodo)=>{
        todoList.add(newTodo);
        if (taskFilter != 'completed') {
            let li = createTodoHtml(newTodo);
            toggleListenning(li);
            deleteTaskListenning(li);
        }
    }

    const inputListenning = () => {
        const input = document.querySelector('.new-todo')
        const inputSrc$ = fromEvent(input, 'keypress');
        inputSrc$.pipe(
            filter((event) => { return event.keyCode === 13 }),
            pluck('target', 'value'),
            filter((task) => { return task != '' }))
            .subscribe((task) => {
                const newTodo = new Todo(task);
                input.value = '';
                setTodo(newTodo);
                renderActiveTasksCount(1)
                createNewTodo(newTodo)
            })
    }

    const filterListenning = () => {
        const ul = document.querySelector('.filters');
        const filterSelections = ul.querySelectorAll('a');
        const filtersSrc$ = fromEvent(filterSelections, 'click');
        filtersSrc$
            .pipe(
                pluck('target'),
                tap((element) => {
                      renderFilterClass(filterSelections,element)
                }),
                pluck('href'))
            .subscribe((href) => {
                let order = href.split('/');
                taskFilter = order[order.length - 1];

                removeAllTasksHtml();

                let completed;

                switch (taskFilter) {
                    case 'active': completed = 'false';
                        break;
                    case 'completed': completed = 'true';
                        break;
                    default: completed = '';
                        break;
                }
                if (completed) {
                    todoList.todos.forEach((task) => {
                        if (completed === 'true') {
                            if (task.complete) {
                                let li = createTodoHtml(task);
                                toggleListenning(li);
                                deleteTaskListenning(li);
                            }
                        } else if (completed === 'false') {
                            if (!task.complete) {
                                let li = createTodoHtml(task);
                                toggleListenning(li);
                                deleteTaskListenning(li);  
                            }
                        }
                    })
                } else {
                    todoList.todos.forEach((task) => {
                        let li = createTodoHtml(task);
                        toggleListenning(li);
                        deleteTaskListenning(li);
                    })
                }
            })

    }

    const removeCompleteListening = () => {
        const removeAllButton = document.querySelector('.clear-completed');
        const removeCompletedSrc$ = fromEvent(removeAllButton, 'click');
        removeCompletedSrc$.subscribe(() => {
            todoList.todos.forEach((task) => {
                if (task.complete) {
                    removeTaskHmtl(task.id)
                }
            })
            todoList.removeCompleted();
        })
    }

    const toggleListenning = (li) => {

        let toggleButton = li.querySelector('.toggle');

        const togglesSrc$ = fromEvent(toggleButton, 'click');
        const checkSrc$ = new Subject();
        const unCheckSrc$ = new Subject();

        togglesSrc$.subscribe(checkSrc$);
        togglesSrc$.subscribe(unCheckSrc$);

        checkSrc$
            .pipe(filter((event) => { return event.target.checked }))
            .subscribe(() => {
                let todo =todoList.toggleTodo(li.getAttribute('data-id'))
                toggleTaskHtml(li, true)
                renderActiveTasksCount(-1)
                replaceTodo(todo);
            })

        unCheckSrc$
            .pipe(filter((event) => { return !event.target.checked }))
            .subscribe(() => {
                let todo= todoList.toggleTodo(li.getAttribute('data-id'))
                toggleTaskHtml(li, false)
                renderActiveTasksCount(1)
                replaceTodo(todo);
            })
    }

    const deleteTaskListenning = (li) => {
        let destroyButton = li.querySelector('.destroy');
        const destroySrc$ = fromEvent(destroyButton, 'click');
        destroySrc$.subscribe(() => {
            removeTaskHmtl(undefined, li);
            let todoId = Number(li.getAttribute('data-id'));
            todoList.remove(todoId)
             removeTodo(todoId);
            if(Array.from(li.classList).includes('completed') === false){
                   renderActiveTasksCount(-1)
            }
        })
    }

    inputListenning();
    filterListenning();
    removeCompleteListening();
    retrieveStorageTodos();

})()













