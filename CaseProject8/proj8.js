// UI Interaction and Task Management
const taskListElement = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const addTaskButton = document.getElementById("addTask");

let tasks = []; // Array to store Task objects

addTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    if (taskName) {
        const newTask = new Task(taskName); // Create a new Task instance
        tasks.push(newTask); // Store the task in the array
        renderTasks(); // Update UI
        taskNameInput.value = ""; // Clear input
    }
});

function renderTasks() {
    taskListElement.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.getDetails();
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Mark Complete";
        completeBtn.onclick = () => {
            task.markCompleted();
            renderTasks();
        };
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        taskListElement.appendChild(li);
    });
}