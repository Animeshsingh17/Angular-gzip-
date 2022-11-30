import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPendingConnectionComponent } from './group-pending-connection.component';

describe('GroupPendingConnectionComponent', () => {
  let component: GroupPendingConnectionComponent;
  let fixture: ComponentFixture<GroupPendingConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPendingConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPendingConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
