import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeClientMsgComponent } from './compose-client-msg.component';

describe('ComposeClientMsgComponent', () => {
  let component: ComposeClientMsgComponent;
  let fixture: ComponentFixture<ComposeClientMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeClientMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeClientMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
