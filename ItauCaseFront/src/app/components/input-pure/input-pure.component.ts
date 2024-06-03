import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password' | 'number';

@Component({
  selector: 'app-input-pure',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPureComponent),
      multi: true,
    },
  ],
  templateUrl: './input-pure.component.html',
  styleUrl: './input-pure.component.scss',
})
export class InputPureComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() inputName: string = '';
  @Input() label: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.onChange(value);

    // TODO: tem um erro muito estranho no form acontecendo
    // em alguns navegadores e em alguns momentos ele não tá enviando
    // os valores deo form para o formControlName, então
    // fiz dessa forma terrível para funcionar, com o tempo vou descobrir o erro
    localStorage.setItem('NewPayment@' + this.inputName, value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched(fn);
  }
}
