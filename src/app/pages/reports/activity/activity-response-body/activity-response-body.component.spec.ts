import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityResponseBodyComponent } from './activity-response-body.component';

describe('ActivityResponseBodyComponent', () => {
  let component: ActivityResponseBodyComponent;
  let fixture: ComponentFixture<ActivityResponseBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityResponseBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityResponseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
