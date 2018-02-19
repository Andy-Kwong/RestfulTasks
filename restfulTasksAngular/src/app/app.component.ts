import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    newTask: any;
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
        this.editTask = { id: "", title: "", description: "" }
    }

    populateEditField(task) {
        // let observable = this._httpService.getOneTask(ID);
        // observable.subscribe(data => {
        //     if (!this.editTask.title && !this.editTask.description) {
        //         this.editTask = { id: "", title: "", description: "" }
        //     }
        //     this.editTask.id = data["task"]._id
        //     this.editTask.title = data["task"].title
        //     this.editTask.description = data["task"].description
        // })

        console.log(task)
        this.editTask.id = task._id;
        this.editTask.title = task.title;
        this.editTask.description = task.description;
    }

    onEditButton(ID) {
        let observable = this._httpService.editTask(this.editTask, ID);
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
