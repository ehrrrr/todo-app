'use strict'

const todos = getSavedTodos();

const filters = {
    searchText: "",
    hideCompleted: false
}

renderTodos(todos, filters);

//Filter todos by input
document.querySelector("#filter-todos").addEventListener("input", (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

//Hide and show completed via checkbox
document.querySelector("#is-completed").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});

//Add todo
document.querySelector("#add-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = e.target.elements.addTodo.value.trim();
    if(text) {
        todos.push({   
                id: uuidv4(),
                text, 
                completed: false
            });
        saveTodos(todos);
        renderTodos(todos, filters);
        e.target.elements.addTodo.value = ""; //Clear the input field
    }
});

