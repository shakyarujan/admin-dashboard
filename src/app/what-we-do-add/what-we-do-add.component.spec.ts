import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeDoAddComponent } from './what-we-do-add.component';

describe('WhatWeDoAddComponent', () => {
  let component: WhatWeDoAddComponent;
  let fixture: ComponentFixture<WhatWeDoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWeDoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeDoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
