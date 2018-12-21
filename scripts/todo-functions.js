'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector("#todo-container");

    const filteredTodos = todos.filter( (todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed);
    
    todoEl.innerHTML="";
    const summary = generateSummaryDOM(incompletedTodos);
    todoEl.appendChild(summary);
    
    if(filteredTodos.length) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        })
    } else {
        const messageEl = document.createElement("p");
        messageEl.classList.add("empty-message");
        messageEl.textContent = "No to-dos to show"
        todoEl.appendChild(messageEl);
    }
}

//Remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex(function(todo){
        return todo.id===id;
    })
    if(todoIndex>=0) {
        todos.splice(todoIndex, 1);
    }
}

//Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const containerEl = document.createElement('div'); 
    const todoEl = document.createElement('label');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('label');
    const removeButton = document.createElement('button');

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute("id", todo.id);
    if(todo.completed){checkbox.setAttribute("checked", "true")} // checkbox.checked = todo.completed;
    
    containerEl.appendChild(checkbox);
    checkbox.addEventListener("change", function(e){
        if(e.target.checked) {
            todo.completed = true;
        } else {
            todo.completed = false;
        }
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    // Setup the todo text
    todoText.textContent = todo.text;
    todoText.setAttribute("for", todo.id);
    containerEl.appendChild(todoText);

    todoEl.classList.add("list-item");
    containerEl.classList.add("list-item__container");
    todoEl.appendChild(containerEl);

    // Setup the remove button
    removeButton.textContent = 'remove';
    removeButton.classList.add("button", "button--text");
    todoEl.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    return todoEl;
}

//Get the DOM elements for list summary
const generateSummaryDOM = (incompletedTodos) => {   
    const summary = document.createElement("h2");
    summary.classList.add("list-title");
    let plural = incompletedTodos.length===1 ? "" : "s";
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left`;
    return summary;
}