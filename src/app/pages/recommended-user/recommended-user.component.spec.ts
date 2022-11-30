import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedUserComponent } from './recommended-user.component';

describe('RecommendedUserComponent', () => {
  let component: RecommendedUserComponent;
  let fixture: ComponentFixture<RecommendedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
