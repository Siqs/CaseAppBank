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

interface User {
  avatar: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
}

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
    this.httpClient
      .get('https://662140c23bf790e070b25a39.mockapi.io/api/v1/user')
      .subscribe({
        next: (response: any) => {
          var user;
          if (
            this.loginForm.value.email !== '' &&
            this.loginForm.value.password !== ''
          ) {
            user = response.find(
              (u: User) =>
                u.email === this.loginForm.value.email &&
                u.password === this.loginForm.value.password
            );
          } else {
            user = response.find(
              (u: User) =>
                u.email === localStorage.getItem('Login@email') &&
                u.password === localStorage.getItem('Login@password')
              // de novo, isso aqui é terrível e jamais subiria em prod
              // está aqui como forma de burlar o erro que está dando de forma inconsistente nos navegadores que testei
              // e para ser solucionado quando o restante tiver funcionando bem, já perdi muito tempo aqui
            );
          }

          if (!user) {
            // TODO: colocar mensagem de erro para usuário não encontrado
            console.log('não encontrado');
          }

          // simulando o envio de auth token com email e password para pegar os dados do banco, pra economizar tempo
          // de desenvolvimento
          sessionStorage.setItem('User@id', user.id);
          sessionStorage.setItem('User@name', user.name);
          sessionStorage.setItem('User@avatar', user.avatar);

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
