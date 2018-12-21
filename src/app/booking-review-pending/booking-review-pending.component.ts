import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-review-pending',
  templateUrl: './booking-review-pending.component.html',
  styleUrls: ['./booking-review-pending.component.scss']
})
export class BookingReviewPendingComponent implements OnInit {

	data: any = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
  	this.getBookingData();
  }

  /*
    Get Booking Data from Booking Service
   */
  getBookingData() {
    this.bookingService.getBookingData().subscribe( res => {
      console.log(res);
      return this.data = res;
    });
  }

  /*
    Get Booking ID 
   */
  getBookingId(booking_id) {
    return this.router.navigate(['/bookingEdit/' + booking_id]);
  }

  /*
    Delete function 
   */
  deletebooking(booking_id) {
    const confirmation = confirm('Are you sure? ' );
    if (confirmation == true ) {
      this.bookingService.deleteBooking(booking_id).subscribe((data) => {
          this.data = data;
      });
    } else {
      //nothing
    }
  }

}
