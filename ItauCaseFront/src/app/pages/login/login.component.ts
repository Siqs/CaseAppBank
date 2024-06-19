import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInputComponent } from '../../components/login-input/login-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoginInputComponent],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z])^[^ ]+$'),
      ]),
    });
  }

  submit() {
    var requestEmail =
      this.loginForm.value.email !== ''
        ? this.loginForm.value.email
        : localStorage.getItem('Login@email');
    var requestPassword =
      this.loginForm.value.password !== ''
        ? this.loginForm.value.password
        : localStorage.getItem('Login@password');

    this.httpClient
      .post('https://localhost:8080/auth/login', {
        requestEmail,
        requestPassword,
      })
      .subscribe({
        next: (response: any) => {
          sessionStorage.setItem('User@name', response.name);
          sessionStorage.setItem('User@token', response.token);
          sessionStorage.setItem('User@id', response.id);
          sessionStorage.setItem('User@avatar', response.avatar);

          this.router.navigate(['home']);
        },
        error: () => {
          console.log(
            'Aconteceu um erro inesperado, por favor tente novamente'
          );
        },
      });
  }
}
