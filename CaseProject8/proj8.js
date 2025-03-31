const taskListElement = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const addTaskButton = document.getElementById("addTask");

//array to hold all of the task objects
let tasks = [];

addTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    if (taskName) {
        let newTask = new Task(taskName); //create a new Task instance
        tasks.push(newTask); //store the task in the array
        renderTasks(); //update UI
        taskNameInput.value = ""; //clear the input string
    }
});

//handles updating the UI by re-rendering it to ensure only the updated information is displayed
function renderTasks() {
    taskListElement.innerHTML = "";
    tasks.forEach((task, index) => {
        //creates a list item to hold the info for the task & the buttons
        const li = document.createElement("li");
        //adds the name & completion status to the list item
        li.textContent = task.getDetails();

        //creating the 3 buttons
        //complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Mark Complete";
        completeBtn.onclick = () => {
            task.markCompleted();
            renderTasks();
        };
        //edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const newTaskName = prompt("Enter new task name:", task.name);
            if (newTaskName && newTaskName.trim() !== "") { //ensures the new name is not blank
                task.updateTask(newTaskName.trim());
                renderTasks();
            }
        };
        //remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        //add the buttons to the list item
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);

        //adds the list item to the page
        taskListElement.appendChild(li);
    });
}