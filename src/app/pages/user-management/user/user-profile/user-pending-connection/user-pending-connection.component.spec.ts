import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingConnectionComponent } from './user-pending-connection.component';

describe('UserPendingConnectionComponent', () => {
  let component: UserPendingConnectionComponent;
  let fixture: ComponentFixture<UserPendingConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPendingConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPendingConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
