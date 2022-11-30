import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserSignupNotLoginComponent } from './user-signup-not-login.component';

describe('DashboardAnalyticsComponent', () => {
  let component: UserSignupNotLoginComponent;
  let fixture: ComponentFixture<UserSignupNotLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignupNotLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupNotLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
