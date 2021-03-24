

const form= document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListners();

//Create function loadEventListners
function loadEventListners(){
    //DOM load event 
    document.addEventListener('DOMContentLoaded',getTasks);

    //add task event
    form.addEventListener('submit',addTask);

    //remove task event
    taskList.addEventListener('click',removeTasks)

    //Clear Task event
    clearBtn.addEventListener('click',clearTasks);

    //filter task event
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
         //create li elemet

    const li= document.createElement('li');
    li.className= 'collection-item';
    //create textNode and append to li

    li.appendChild(document.createTextNode(task));

    //Create new link 
    const link = document.createElement('a');
    //Add class to link
    link.className='delete-item secondary-content';

    // add icon html 
    link.innerHTML = '<i class=" fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul 

    taskList.appendChild(li);
    });
}

//Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add task')
    }

    //create li elemet

    const li= document.createElement('li');
    li.className= 'collection-item';
    //create textNode and append to li

    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link 
    const link = document.createElement('a');
    //Add class to link
    link.className='delete-item secondary-content';

    // add icon html 
    link.innerHTML = '<i class=" fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul 

    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input

    taskInput.value='';

    e.preventDefault(); 
}

//Store tasks

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove tasks
function removeTasks(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

             // remove task from LS
             removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
         
    }

}

//remove task from LS

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks(e){
    // way-1
    //taskList.innerHTML = '';

    //way-2 (faster)
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS 
    clearTaskFromLocalStorage();
}

// Clear task from LS

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//filter task

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item  = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';

        }else{
            task.style.display='none';
        }

    });
}
