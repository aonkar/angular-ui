import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
    this.userName = this.loginService.getUserId();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
