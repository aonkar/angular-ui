import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  async submitHandler() {
    this.loginFailed = false;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.loginService.login(email, password).subscribe((response: boolean) => {
      if (response) {
        this.router.navigate(['home']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
