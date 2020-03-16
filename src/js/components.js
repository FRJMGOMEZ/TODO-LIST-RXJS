

const todoListHtml = document.querySelector('.todo-list'); 

export const createTodoHtml = (todo) => {

    const htmlTodo = `
    	<li class="${ todo.complete ? 'completed' : ''}" data-id="${todo.id}"   >
						 <div class="view">
							<input class="toggle" type="checkbox" ${todo.complete ? 'checked' : ''}>
							<label>${todo.task}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="${todo.task}">
					</li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    todoListHtml.append(div.firstElementChild);
    let list = todoListHtml.getElementsByTagName('li')[todoListHtml.getElementsByTagName('li').length-1]
    return list;
}

export const toggleTaskHtml = (li,checked)=>{
    if(checked){
       li.classList.add('completed');
    }else{
        li.classList.remove('completed')
    }
}


export const removeTaskHmtl = (taskId,li) => {
    if(taskId){
        let task = Array.from(todoListHtml.querySelectorAll(`li[data-id= '${taskId}']`))[0];
        task.remove()
    }
    if(li){
        li.remove();
    }
}


export const removeAllTasksHtml = () => {
    let tasks = Array.from(todoListHtml.querySelectorAll('li'));
    tasks.forEach((task) => {
        task.remove();
    })
}


let activeTaskCount = 0;
let span = document.querySelector('.todo-count');
let todoCount = span.querySelector('strong');
export const renderActiveTasksCount = (value)=>{

    activeTaskCount = activeTaskCount + value;
    todoCount.innerText = activeTaskCount;
}


export const renderFilterClass = (filtersSelections,filterSelected)=>{
    Array.from(filtersSelections).forEach((filterTag)=>{ 
        if(filterTag != filterSelected){
            filterTag.classList.remove('filter-selected')
        }
    })
    filterSelected.classList.add('filter-selected')
}

