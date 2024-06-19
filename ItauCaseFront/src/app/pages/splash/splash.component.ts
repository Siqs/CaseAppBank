import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

interface Users {
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  id: string;
}
@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent implements OnInit {
  users: Users[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    var id = sessionStorage.getItem('User@id') || '';
    const getUsers = this.httpClient
      .get('https://662140c23bf790e070b25a39.mockapi.io/api/v1/user')
      .pipe(
        switchMap((response: any) => {
          this.users = response;
          console.log('1', response);
          console.log('2', this.users);
          return this.httpClient.post(
            'http://localhost:8080/auth/register',
            this.users
          );
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['onboarding']);
      });
  }
}
