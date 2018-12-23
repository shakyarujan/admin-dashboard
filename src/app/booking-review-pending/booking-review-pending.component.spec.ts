import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingReviewPendingComponent } from './booking-review-pending.component';

describe('BookingReviewPendingComponent', () => {
  let component: BookingReviewPendingComponent;
  let fixture: ComponentFixture<BookingReviewPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingReviewPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingReviewPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
