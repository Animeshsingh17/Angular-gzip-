import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterestComponent } from './add-user-interest.component';

describe('AddUserInterestComponent', () => {
  let component: AddUserInterestComponent;
  let fixture: ComponentFixture<AddUserInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
