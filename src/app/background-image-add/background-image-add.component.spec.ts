import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImageAddComponent } from './background-image-add.component';

describe('BackgroundImageAddComponent', () => {
  let component: BackgroundImageAddComponent;
  let fixture: ComponentFixture<BackgroundImageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundImageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
