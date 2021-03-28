const todoForm = document.querySelector('.todo-form'),
  todoInput = todoForm.querySelector('input'),
  todoList = document.querySelector('.todo-list');

const TODOS = "todos";

let todos = [];

function deleteTodo (event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const index = parseInt(li.id);
  todos.splice(index,1);
  saveTodos();
}

function saveTodos () {
    localStorage.setItem(TODOS, JSON.stringify(todos));
}

function fillTodo (text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");

  span.innerText = text;

  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTodo);

  li.appendChild(deleteBtn);
  li.appendChild(span);

  li.id = todos.length;
  todoList.appendChild(li);
  const todoObj = {
      text: text,
      id: li.id,
  };
  todos.push(todoObj);
  saveTodos();
}

function handleSubmit (event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  fillTodo(currentValue);
  todoInput.value = "";
}

function loadedTodos () {
  const loadedTodos = localStorage.getItem(TODOS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function(todo) {
        fillTodo(todo.text);
    });
  };
}

function init() {
  loadedTodos();
  todoForm.addEventListener("submit", handleSubmit);
};

init();