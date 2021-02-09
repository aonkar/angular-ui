import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private activeUser: string;
  private readonly KEY = 'activeuser';

  constructor(private userService: UsersService) {
    if (localStorage.hasOwnProperty(this.KEY)) {
      this.activeUser = localStorage.getItem(this.KEY);
    }
  }

  public getUserId(): string {
    return this.activeUser;
  }

  public login(username: string, password: string): Observable<boolean> {
    const user: User = {
      username: username,
      password: password
    };
    const userExist = this.userService.validateUser(user);
    if (userExist) {
      this.activeUser = username;
      localStorage.setItem(this.KEY, username);
    }
    return of(userExist);
  }

  public logout(): void {
    localStorage.removeItem(this.KEY);
    this.activeUser = undefined;
  }

  public isLoggedIn(): boolean {
    return this.activeUser !== undefined;
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.KEY);
  }
}
