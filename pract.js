// Selectors

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const toDoList1 = document.querySelector('.todo-list1');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');
const duedate = document.querySelector('#due-date');
const search = document.querySelector('#search');


// Event Listeners

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
toDoList1.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));
search.addEventListener('keyup',searching);

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from relaoding;
    event.preventDefault();

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const work = document.getElementById("workc").checked;
    const personal = document.getElementById("personalc").checked;
    const dating = document.getElementById("due-date").value;
    const today = new Date();
    const inputdate = new Date(dating);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '' || dating === "" || (work === false && personal === false) ) {
            alert("Fill all the details!");
    } 
    else if(inputdate < today){
        alert ("Due date can't be in past!") ;
    }    
    else {
        // newToDo.innerText = "hey";
        if(work === true){
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        newToDo.setAttribute('data-due-time',Date.parse(inputdate));
        newToDo.contentEditable = "true";
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(toDoInput.value);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        


        // Append to list;
        toDoList.appendChild(toDoDiv);

        // CLearing the input;
        toDoInput.value = '';
        }
        else if(personal === true){
            newToDo.innerText = toDoInput.value;
            newToDo.classList.add('todo-item');
            newToDo.setAttribute('data-due-time',Date.parse(inputdate));
            newToDo.contentEditable = "true";
            toDoDiv.appendChild(newToDo);
    
            // Adding to local storage;
            savelocal(toDoInput.value);
    
            // check btn;
            const checked = document.createElement('button');
            checked.innerHTML = '<i class="fas fa-check"></i>';
            checked.classList.add('check-btn', `${savedTheme}-button`);
            toDoDiv.appendChild(checked);
            // delete btn;
            const deleted = document.createElement('button');
            deleted.innerHTML = '<i class="fas fa-trash"></i>';
            deleted.classList.add('delete-btn', `${savedTheme}-button`);
            toDoDiv.appendChild(deleted);
    
            // Append to list;
            toDoList1.appendChild(toDoDiv);
    
            // CLearing the input;
            toDoInput.value = '';
        }
        // newToDo.contentEditable = "true";
        
        
    }
    duedate.value = "";
    
}   

function searching(e){
    e.preventDefault();

    const text = e.target.value.toLowerCase();
    const alltask = document.querySelectorAll('.todo-item');
    for(let task of alltask){
        const todoitem = task.textContent;
        if(task === text){
            task.style.color = 'yellow';
        }
        if(todoitem.toLowerCase().indexOf(text)!=-1){
            task.style.color = 'yellow';
        }
        
        if(text === ""){
            task.style.color ='#ffdfdb';
        }
    }
    
    
}


function deletecheck(event){

    //  console.log(event.target);
    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        // item.parentElement.remove();
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    // check
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }



}


// Saving to local storage:
function savelocal(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        // newToDo.setAttribute('data-due-time',Date.parse(inputdate));
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}


function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Change theme function:
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    // Change blinking cursor for darker theme:
    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    // Change buttons color according to their type (todo, check or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${color}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}