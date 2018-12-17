import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  data: any = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.getBookingData();
  }

  // Get Booking Data
  getBookingData() {
    this.bookingService.getBookingData().subscribe( res => {
      console.log(res);
      return this.data = res;
    });
  }

  // Get Booking Id
  getBookingId(booking_id) {
    return this.router.navigate(['/bookingEdit/' + booking_id]);
  }

  // Delete the booking contents
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