import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Payments {
  id: string;
  createdAt: string;
  category: string;
  name: string;
  amount: string;
}

@Component({
  selector: 'app-statements',
  standalone: true,
  imports: [NgFor],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss',
})
export class StatementsComponent implements OnInit {
  payments: Payments[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    var id = sessionStorage.getItem('User@id') || '';
    this.httpClient
      .get(
        `https://662140c23bf790e070b25a39.mockapi.io/api/v1/user/${id}/account`
      )
      .subscribe({
        next: (response: any) => {
          this.payments = response[0].payments;
        },
        error: () => console.log('error'),
      });
  }

  back() {
    this.router.navigate(['home']);
  }
}
