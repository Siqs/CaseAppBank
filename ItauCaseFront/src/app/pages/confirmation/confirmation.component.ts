import { DatePipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [NgIf],
  providers: [DatePipe],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  name: string = '';
  cpf: string = '';
  bank: string = '';
  account: string = '';
  date: string = '';
  hour: string = '';
  amount: string = '';

  confirmed: boolean = false;
  send: boolean = false;
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private httpClient: HttpClient
  ) {}

  back() {
    this.router.navigate(['home']);
  }

  getDate() {
    return this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  getHours() {
    return this.datePipe.transform(new Date(), 'shortTime');
  }

  getRequestObject() {
    return {
      userName: sessionStorage.getItem('User@name'),
      userAccount: sessionStorage.getItem('User@account'),
      useramount: sessionStorage.getItem('User@amount'),
      recipientName: localStorage.getItem('NewPayment@name'),
      recipientCpf: localStorage.getItem('NewPayment@cpf'),
      recipientBank: localStorage.getItem('NewPayment@bank'),
      recipientAccount: localStorage.getItem('NewPayment@account'),
      paymentamount: localStorage.getItem('NewPayment@amount'),
      paymentMessage: localStorage.getItem('NewPayment@message'),
      paymentType: localStorage.getItem('NewPayment@type'),
    };
  }
  submit() {
    if (!this.confirmed) {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem('User@token')}`,
      };
      //to-do criar interceptor para requests com header automatico
      this.httpClient
        .post('http://localhost:8080/payment/new', this.getRequestObject(), {
          headers,
        })
        .subscribe({
          next: (response: any) => {
            this.confirmed = true;
          },
          error: () => console.log('error'),
        });
    } else {
      this.send = true;
    }
  }

  ngOnInit() {
    this.name = localStorage.getItem('NewPayment@name') || '';
    this.cpf = localStorage.getItem('NewPayment@cpf') || '';
    this.bank = localStorage.getItem('NewPayment@bank') || '';
    this.account = localStorage.getItem('NewPayment@account') || '';
    this.amount = localStorage.getItem('NewPayment@amount') || '';
    this.date = this.getDate() || '';
    this.hour = this.getHours() || '';
  }
}
