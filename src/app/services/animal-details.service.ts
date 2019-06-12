import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AnimalDetailsService {

   constructor(private http: HttpClient) {}

    public getDetails(id){
        return this.http.get("../../assets/animalDetailsDb.json")
          .pipe(map((response: any) => {
            return response[id];
          }))
      }
}