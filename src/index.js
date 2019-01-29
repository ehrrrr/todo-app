// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { renderTodos } from "./views";
import { setFilters, getFilters } from "./filters";
import { createTodo } from "./todos";

// Render initial todos
renderTodos();

// Set up search text handler
document.querySelector("#filter-todos").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    });
    renderTodos();
});

// Set up checkbox handler
document.querySelector("#is-completed").addEventListener("change", (e) => {
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTodos();
});

// Set up form submission handler
document.querySelector("#add-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = e.target.elements.addTodo.value.trim();
    if(text) {
        createTodo(text);
        renderTodos();
        e.target.elements.addTodo.value = ""; //Clear the input field
    }
});

// Bonus: Add a watcher for local storage
window.addEventListener("storage", function(e){
    if(e.key==="todos") {
        renderTodos();
    }
});