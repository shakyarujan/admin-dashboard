import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMsgViewComponent } from './client-msg-view.component';

describe('ClientMsgViewComponent', () => {
  let component: ClientMsgViewComponent;
  let fixture: ComponentFixture<ClientMsgViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMsgViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMsgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
