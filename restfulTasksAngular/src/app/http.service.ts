import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {

    constructor(private _http: HttpClient) {
        this.getOneTask();
    }
    getTasks(){

        return this._http.get('/tasks');
     }

    getOneTask(){
        let tempObservable = this._http.get("/tasks/5a84bd2ec99f5fc67a4ffdff");
        tempObservable.subscribe(data => console.log("Got one task!", data))
    }

    addTask(newtask) {
        return this._http.post('/tasks', newtask);
    }

    // Logic to delete task gets ID from app.components.ts and sends http request to server
    deleteTask(ID) {
        return this._http.delete(`/tasks/${ID}`)
    }

    editTask(updatedTask) {
        return this._http.put(`/tasks/${ID}`)
    }
}
