import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPureComponent } from './input-pure.component';

describe('InputPureComponent', () => {
  let component: InputPureComponent;
  let fixture: ComponentFixture<InputPureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
