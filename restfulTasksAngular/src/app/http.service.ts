import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {

    constructor(private _http: HttpClient) {
        this.getTasks();
        this.getOneTask();
    }
    getTasks(){
        let tempObservable = this._http.get('/tasks');
        tempObservable.subscribe(data => console.log("Got our tasks!", data));
     }

    getOneTask(){
        let tempObservable = this._http.get("/tasks/5a84bd2ec99f5fc67a4ffdff");
        tempObservable.subscribe(data => console.log("Got one task!", data))
    }
}
