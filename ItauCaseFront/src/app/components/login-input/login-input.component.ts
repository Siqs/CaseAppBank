import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password';

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginInputComponent),
      multi: true,
    },
  ],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
})
export class LoginInputComponent implements ControlValueAccessor {
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
    // os valores de password e email para o formControlName, então
    // fiz dessa forma terrível para funcionar, com o tempo vou descobrir o erro
    localStorage.setItem('Login@' + this.inputName, value);
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
