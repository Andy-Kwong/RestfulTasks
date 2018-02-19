import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {

    constructor(private _http: HttpClient) {

    }

    getTasks(){

        return this._http.get('/tasks');
     }

    getOneTask(ID){

        return this._http.get(`/tasks/${ID}`)
    }

    addTask(newtask) {

        return this._http.post('/tasks', newtask);
    }

    deleteTask(ID) {
        return this._http.delete(`/tasks/${ID}`);
    }

    // EDIT TASK STEP 5: We send the updatedTask (editTask Object) to server.js to update the database.
    commitEditTask(updatedTask) {
        // We pass in the id stored in the updatedTask object in order to find and edit the specific task we're updating
        return this._http.put(`/tasks/${updatedTask.id}`, updatedTask);
    }
}
