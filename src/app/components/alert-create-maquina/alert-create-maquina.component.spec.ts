import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCreateMaquinaComponent } from './alert-create-maquina.component';

describe('AlertCreateMaquinaComponent', () => {
  let component: AlertCreateMaquinaComponent;
  let fixture: ComponentFixture<AlertCreateMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCreateMaquinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertCreateMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
