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

interface UserAccount {
  createdAt: string;
  account: string;
  amount: string;
  payments: Payments[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  userAccount: UserAccount = {
    createdAt: '',
    account: '',
    amount: '',
    payments: [],
  };
  name: string = '';
  avatar: string = '';
  maskedAccount: string = '';
  payments: any = []; // create type payments

  constructor(private httpClient: HttpClient, private router: Router) {
    this.name = sessionStorage.getItem('User@name') || '';
    this.avatar = sessionStorage.getItem('User@avatar') || '';

    console.log(this.name);
  }

  ngOnInit() {
    var id = sessionStorage.getItem('User@id') || '';
    this.httpClient
      .get(
        `https://662140c23bf790e070b25a39.mockapi.io/api/v1/user/${id}/account`
      )
      .subscribe({
        next: (response: any) => {
          this.userAccount = response[0];
          this.maskedAccount = this.userAccount.account;
          this.maskedAccount.replace(this.maskedAccount.charAt(0), '*');
          this.maskedAccount.replace(this.maskedAccount.charAt(1), '*');

          sessionStorage.setItem('User@account', this.userAccount.account);
          sessionStorage.setItem('User@amount', this.userAccount.amount);
        },
        error: () => console.log('error'),
      });
  }

  getAvatar() {
    return this.avatar;
  }

  goToStatements() {
    this.router.navigate(['statements']);
  }

  newPayment() {
    this.router.navigate(['newPayment']);
  }
}
