import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewViewComponent } from './customer-review-view.component';

describe('CustomerReviewViewComponent', () => {
  let component: CustomerReviewViewComponent;
  let fixture: ComponentFixture<CustomerReviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
