import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputPureComponent } from '../../components/input-pure/input-pure.component';
import { SelectComponent } from '../../components/select/select.component';

@Component({
  selector: 'app-new-payment',
  standalone: true,
  imports: [ReactiveFormsModule, InputPureComponent, SelectComponent],
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.scss',
})
export class NewPaymentComponent {
  newPaymentForm!: FormGroup;

  constructor(private router: Router) {
    this.newPaymentForm = new FormGroup({
      bank: new FormControl('', []),
      account: new FormControl('', []),
      recipientName: new FormControl('', []),
      recipientCPF: new FormControl('', []),
      amount: new FormControl('', []),
      type: new FormControl('', []),
      message: new FormControl('', []),
    });
  }

  back() {
    this.router.navigate(['home']);
  }

  submit() {
    this.router.navigate(['confirmation']);
  }
}
