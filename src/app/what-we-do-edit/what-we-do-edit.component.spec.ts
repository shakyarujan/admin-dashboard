import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeDoEditComponent } from './what-we-do-edit.component';

describe('WhatWeDoEditComponent', () => {
  let component: WhatWeDoEditComponent;
  let fixture: ComponentFixture<WhatWeDoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWeDoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeDoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
