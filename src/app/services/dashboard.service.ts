import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

   constructor(private http: HttpClient) {}

    public getData(): Observable<any> {
        return this.http.get("../../assets/db.json");
    }
}