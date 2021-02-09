import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { User } from '../models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userExists = false;
  users: User[];
  constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            this.users = data;
        });
    }
    public validateUser(user: User): boolean {
      this.users.forEach(savedUser => {
          if(savedUser.username === user.username && savedUser.password === user.password){
            this.userExists =true;
            return;
          }
      });
      return this.userExists;
    }
    public getJSON(): Observable<any> {
        return this.http.get("./assets/users.json");
    }
}
