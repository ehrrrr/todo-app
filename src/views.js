import { getTodos, removeTodo, saveTodos } from "./todos";
import { getFilters } from "./filters";

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
    const todos = getTodos();
    const filters = getFilters();
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

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
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
        saveTodos();
        renderTodos();
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
        saveTodos();
        renderTodos();
    })

    return todoEl;
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = (incompletedTodos) => {   
    const summary = document.createElement("h2");
    summary.classList.add("list-title");
    let plural = incompletedTodos.length===1 ? "" : "s";
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left`;
    return summary;
}

// Make sure to set up the exports
export {renderTodos, generateTodoDOM, generateSummaryDOM}