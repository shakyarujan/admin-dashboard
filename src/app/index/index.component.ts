import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { ReviewService } from '../service/review.service';
import { PackageService } from '../service/package.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data: any = [];
  tripData: any = [];
  dataReview: any = [];
  totalBookingData: any = [];
  pendingBookingData: any = [];
  confirmBookingData: any = [];
  count;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private review: ReviewService,
    private authService: AuthService,
    private packageService: PackageService
  ) { }

  ngOnInit() {
    this.bookedData();
    this.getReview();
    this.totalBooking();
    this.pendingBooking();
    this.confirmBooking();
    this.getTripData();
  }

  // get tripdata count

  getTripData() {
    this.packageService.gettripData().subscribe((res: any) => {
      this.tripData = res;
      const value = this.tripData.length;
      return this.count = value;
    });
  }


  // get review
  getReview() {
    this.review.getReview().subscribe(res => {
      return this.dataReview = res;
    });
  }

  // get booked detail
  bookedData() {
    this.bookingService.getBookingData().subscribe(res => {
      return this.data = res;
    });
  }

  // update the booking content
  // editbooking(booking_id) {
  //    this.router.navigate(['/bookingEdit/' + booking_id]);
  // }

  // Delete the booking contents
  // deletebooking(booking_id) {
  //   const confirmation = confirm('Are you sure? ' );
  //   if (confirmation == true ) {
  //     this.bookingService.deleteBooking(booking_id).subscribe((data) => {
  //         this.data = data;
  //     });
  //   } else {
  //     //nothing
  //   }
  // }

  // Total booking
  totalBooking() {
    this.bookingService.totalBooking().subscribe(res => {
      return this.totalBookingData = res;
    });
  }

  // Pending booking
  pendingBooking() {
    this.bookingService.pendingBooking().subscribe(res => {
      return this.pendingBookingData = res;
    });
  }

  // Confirm booking
  confirmBooking() {
    this.bookingService.confirmBooking().subscribe(res => {
      return this.confirmBookingData = res;
    });
  }

}
