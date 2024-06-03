import { NgFor } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @Input() selectName: string = '';
  @Input() label: string = '';
  @Input() selectType: string = '';
  options: any[] = [];
  selected: number = 1;

  bankOptions: any[] = [
    { id: 1, name: '123 - Banco do Brasil' },
    { id: 2, name: '222 - Nubank' },
    { id: 3, name: '342 - Itaú Unibanco' },
    { id: 4, name: '221 - Banco Pan' },
    { id: 5, name: '225 - Banco Original' },
  ];

  paymentOptions: any[] = [
    { id: 1, name: 'TED' },
    { id: 2, name: 'DOC' },
    { id: 3, name: 'PIX' },
  ];

  constructor() {}

  ngOnInit() {
    if (this.selectType === 'bank') this.options = this.bankOptions;
    if (this.selectType === 'payment') this.options = this.paymentOptions;
  }

  onChange(event: any) {
    this.selected = event.target.value;

    // para burlar erro no form que acontece sem constância e estou sem tempo de corrigir
    let selectedOption: string =
      this.selectType === 'bank'
        ? this.bankOptions[this.selected].name
        : this.paymentOptions[this.selected].name;
    localStorage.setItem('NewPayment@' + this.selectName, selectedOption);
  }
}
