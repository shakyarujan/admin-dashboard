import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewEditComponent } from './customer-review-edit.component';

describe('CustomerReviewEditComponent', () => {
  let component: CustomerReviewEditComponent;
  let fixture: ComponentFixture<CustomerReviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
