import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogsComponentComponent } from './delete-dialogs-component.component';

describe('DeleteDialogsComponentComponent', () => {
  let component: DeleteDialogsComponentComponent;
  let fixture: ComponentFixture<DeleteDialogsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
