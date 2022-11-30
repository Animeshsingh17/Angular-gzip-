import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConnectionComponent } from './remove-connection.component';

describe('AddUserConnectionComponent', () => {
  let component: RemoveConnectionComponent;
  let fixture: ComponentFixture<RemoveConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
