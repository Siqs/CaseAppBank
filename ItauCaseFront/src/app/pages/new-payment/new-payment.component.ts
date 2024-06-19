import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
      bank: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
      recipientName: new FormControl('', [Validators.required]),
      recipientCPF: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
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
