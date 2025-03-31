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

// Example usage (commented out, used in index.html instead):
// let task1 = new Task("Finish homework");
// console.log(task1.getDetails()); // Output: Finish homework
// task1.markCompleted();
// console.log(task1.getDetails()); // Output: Finish homework (Completed)