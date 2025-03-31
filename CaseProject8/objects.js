// Task Class: Represents a task in the task manager.
class Task {
    //constructor to initialize task elements
    constructor(name) {
        this.name = name; // Task name
        this.completed = false; // Default: Task is not completed
    }

    //marks the task as completed
    markCompleted() {
        this.completed = true;
    }

    //updates the name of the task to the parameter
    updateTask(newName) {
        this.name = newName;
    }

    //returns the name of the task & the completion status
    getDetails() {
        return this.completed ? `${this.name} (Completed)` : this.name;
    }
}