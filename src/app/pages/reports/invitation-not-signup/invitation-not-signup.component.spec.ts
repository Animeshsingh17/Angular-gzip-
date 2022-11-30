import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvitationNotSignupComponent } from './invitation-not-signup.component';

describe('DashboardAnalyticsComponent', () => {
  let component: InvitationNotSignupComponent;
  let fixture: ComponentFixture<InvitationNotSignupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationNotSignupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationNotSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
