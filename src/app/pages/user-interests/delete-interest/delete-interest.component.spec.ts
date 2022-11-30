import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterestComponent } from './delete-interest.component';

describe('DeleteInterestComponent', () => {
  let component: DeleteInterestComponent;
  let fixture: ComponentFixture<DeleteInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
