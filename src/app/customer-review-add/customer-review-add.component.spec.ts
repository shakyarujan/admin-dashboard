import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewAddComponent } from './customer-review-add.component';

describe('CustomerReviewAddComponent', () => {
  let component: CustomerReviewAddComponent;
  let fixture: ComponentFixture<CustomerReviewAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
