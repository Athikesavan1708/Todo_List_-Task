        // { ToDo List}

// Select HTML Elements

let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let pendingTasks = document.getElementById("pendingTasks");
let clearCompletedBtn = document.getElementById("clearCompletedBtn");


// Load Tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save Tasks to localStorage

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Update Task Counters

function updateCounters() {
    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(function(task) {
            return task.completed;
        }).length;

    pendingTasks.textContent =
        tasks.filter(function(task) {
            return !task.completed;
        }).length;
}


// Display Tasks

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        // Complete / Uncomplete Task

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        });

        // Edit Button

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {
            let updatedText = prompt("Edit your task:", task.text);

            if (updatedText === null) {
                return;
            }

            updatedText = updatedText.trim();

            if (updatedText === "") {
                alert("Please enter a task");
                return;
            }

            let duplicate = tasks.some(function(item, i) {
                return i !== index &&
                    item.text.toLowerCase() === updatedText.toLowerCase();
            });

            if (duplicate) {
                alert("Task already exists");
                return;
            }

            task.text = updatedText;

            saveTasks();
            displayTasks();
        });

        // Delete Button

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCounters();
}


// Add Task

addTaskBtn.addEventListener("click", function() {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let duplicate = tasks.some(function(task) {
        return task.text.toLowerCase() === taskText.toLowerCase();
    });

    if (duplicate) {
        alert("Task already exists");
        return;
    }

    let newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
});


// Clear Completed Tasks

clearCompletedBtn.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();
    displayTasks();
});


// Display Saved Tasks on Page Load

displayTasks();
