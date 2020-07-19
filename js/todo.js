// Global vars
var newListBtn = document.getElementById("addNewList"),
  listsContainer = document.querySelector(".todoList-container");

// Create a new list
newListBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createNewList();
});

// Attaching events for dymanically generated list elements
// This reduces the amount of events attached to 1 instead of multiples of 5 for each list
// may be improved with a switch statement instead
listsContainer.addEventListener("click", function (e) {
  if (e.target) {
    if (e.target.classList.contains("btn-removeList")) {
      // remove selected list
      e.target.parentElement.parentElement.remove();
    } else if (e.target.classList.contains("btn-createTask")) {
      // create new task
      createTask(e.target.parentElement);
    } else if (e.target.classList.contains("btn-removeTask")) {
      // remove selected task
      e.target.parentElement.remove();
    } else if (e.target.classList.contains("task-toggle")) {
      // toggle task done status
      e.target.parentElement.className = e.target.checked
        ? "task-todo task-todo-done"
        : "task-todo";
    } else if (e.target.classList.contains("btn-toggleVisibility")) {
      // toggle tasks visible
      toggleVisibility(e.target.parentElement.parentElement, e.target);
    } else {
      // do nothing
    }
  }
});

// create new task when pressing enter/done or go on desktop and mobile devices
// sending current container ensures new task is added to the same
listsContainer.addEventListener("keydown", function (e) {
  if (e.target && e.key === "Enter") {
    if (e.target.value && e.target.className !== 'task-list-name') {
      createTask(e.target.parentElement.parentElement.parentElement);
    }
  }
});

// function that creates a fresh list with all action components
function createNewList() {
  let newList = document.createElement("div"),
    listHeader = document.createElement("div"),
    listNameInput = document.createElement("input"),
    listContent = document.createElement("ul"),
    listRemoveBtn = document.createElement("button"),
    listCreateTask = document.createElement("button"),
    listToggleVisibility = document.createElement("button");

  listHeader.className = "todoList-header";
  listContent.className = "todoList-list";
  newList.className = "todoList col-md-6 col-lg-4";

  // editable list name
  listNameInput.type = "text";
  listNameInput.placeholder = 'eg. Groceries...';
  listNameInput.className = 'task-list-name';


  // button to remove list
  listRemoveBtn.className = "btn btn-danger btn-sm btn-removeList";

  // appends new task
  listCreateTask.className = "btn btn-success btn-sm btn-createTask";
  listCreateTask.textContent = "Add task";

  // button to toggle tasks visibility
  listToggleVisibility.className = "btn btn-light btn-sm btn-toggleVisibility";
  listToggleVisibility.textContent = "Hide completed tasks";

  listHeader.appendChild(listNameInput);
  listHeader.appendChild(listRemoveBtn);
  listHeader.appendChild(listToggleVisibility);

  newList.appendChild(listHeader);
  newList.appendChild(listContent);
  newList.appendChild(listCreateTask);

  // new list appened to main container
  listsContainer.appendChild(newList);

  listNameInput.focus();
}

// function to create a fresh task with action components
function createTask(container) {
  let taskContainer = document.createElement("li"),
    task = document.createElement("input"),
    doneCheckbox = document.createElement("input"),
    doneLabel = document.createElement("label"),
    removeTask = document.createElement("button"),
    list = container.querySelector(".todoList-list"),
    customCheckboxID = "custom-checkbox" + guidGenerator();

  taskContainer.className = "task-todo";
  task.type = "text";
  task.className = "task-input";

  // button to remove selected task
  removeTask.className = "btn-removeTask";

  // checkbox to toggle status of task
  doneCheckbox.type = "checkbox";
  doneCheckbox.className = "task-toggle";
  doneCheckbox.id = customCheckboxID;
  doneLabel.setAttribute("for", customCheckboxID);

  taskContainer.appendChild(doneCheckbox);
  taskContainer.appendChild(doneLabel);
  taskContainer.appendChild(task);
  taskContainer.appendChild(removeTask);

  list.appendChild(taskContainer);
  task.focus();
}

// function to toggle tasks visibility
function toggleVisibility(container, toggleBtn) {
  let currentList = container.querySelector(".todoList-list"),
    doneTasks = currentList && currentList.querySelectorAll(".task-todo-done");

  if (doneTasks.length > 0) {
    toggleBtn.textContent = toggleBtn.textContent.includes("Hide")
      ? "Show completed tasks"
      : "Hide completed tasks";

    doneTasks.forEach(function (task) {
      task.classList.toggle("hide");
    });
  }
}

// Guid generator for custom checkboxes -credits to Joe on stackoverflow
// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() );
}
