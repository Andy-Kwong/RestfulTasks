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

    // Logic to delete task gets ID from app.components.ts and sends http request to server
    deleteTask(ID) {
        return this._http.delete(`/tasks/${ID}`);
    }

    editTask(updatedTask, ID) {

        return this._http.put(`/tasks/${ID}`, updatedTask);
    }
}
