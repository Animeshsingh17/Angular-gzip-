import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePropertiesComponent } from './message-properties.component';

describe('MessagePropertiesComponent', () => {
  let component: MessagePropertiesComponent;
  let fixture: ComponentFixture<MessagePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
