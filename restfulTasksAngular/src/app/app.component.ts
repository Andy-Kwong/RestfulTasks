import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    newTask: any;

    // EDIT TASK STEP 0a: Instatiate a variable that will hold data to be used to populate the text fields in HTML as well as be sent to the server to update our database
    editTask: any;

    tasks = []
    showTasks: boolean;
    showHide: String;

    constructor(private _httpService: HttpService) {}

    ngOnInit() {
        this.getTasksFromService();
        this.showTasks = false;
        this.showHide = "Show";
        this.newTask = { title: "", description: "" }

        // EDIT TASK STEP 0b: We assign editTask as an Object with empty strings as default values
        this.editTask = { id: "", title: "", description: "" }
    }

    // EDIT TASK STEP 2: We use the task that was passed into the function to assign respective values to editTask object
    // Which is then reflected in the text field values in component.HTML
    populateEditField(task) {
        console.log(task)
        this.editTask.id = task._id;
        this.editTask.title = task.title;
        this.editTask.description = task.description;
    }

    onEditButton() {

        // EDIT TASK STEP 4: Since editTask was being updated in real-time, we can send the raw editTask object as a parameter to the commitEditTask() method in service.ts
        let observable = this._httpService.commitEditTask(this.editTask);
        observable.subscribe(data => {
            console.log("Editing post", data);
            this.getTasksFromService();
        })

        this.editTask = { id: "", title: "", description: "" };
    }

    onDeleteButton(ID) {
        console.log(ID);
        let observable = this._httpService.deleteTask(ID);
        observable.subscribe(data => {
            console.log("Deleting post", data);
        })

        this.getTasksFromService();
    }

    onSubmit() {
        let observable = this._httpService.addTask(this.newTask);
        observable.subscribe(data => {
            console.log("Got data from post back", data);
            this.newTask = { title: "", description: "" }
        })

        this.getTasksFromService();
    }

    getTasksFromService() {
        let observable = this._httpService.getTasks();
        observable.subscribe(data => {
            console.log("Got our data", data);
            this.tasks = data["tasks"];
        });
    }

    onButtonClick(): void {

        this.getTasksFromService();

        if (this.showTasks == false) {
            this.showTasks = true;
            this.showHide = "Hide";
        }

        else {
            this.showTasks = false;
            this.showHide = "Show";
        }
    }
}
