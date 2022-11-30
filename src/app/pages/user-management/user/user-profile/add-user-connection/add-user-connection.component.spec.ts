import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserConnectionComponent } from './add-user-connection.component';

describe('AddUserConnectionComponent', () => {
  let component: AddUserConnectionComponent;
  let fixture: ComponentFixture<AddUserConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
