import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteractionLocationComponent } from './user-interaction-location.component';

describe('UserInteractionLocationComponent', () => {
  let component: UserInteractionLocationComponent;
  let fixture: ComponentFixture<UserInteractionLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInteractionLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInteractionLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
