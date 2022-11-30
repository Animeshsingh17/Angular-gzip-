import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicationPropertiesUpdateComponent } from './update-application-properties.component';

describe('UpdateApplicationPropertiesUpdateComponent', () => {
  let component: UpdateApplicationPropertiesUpdateComponent;
  let fixture: ComponentFixture<UpdateApplicationPropertiesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateApplicationPropertiesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApplicationPropertiesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
