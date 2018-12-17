import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMsgComponent } from './client-msg.component';

describe('ClientMsgComponent', () => {
  let component: ClientMsgComponent;
  let fixture: ComponentFixture<ClientMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
