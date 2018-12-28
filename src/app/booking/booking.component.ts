import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  data: any = [];

  constructor(private bookingService: BookingService, 
    private toastr: ToastrService, 
    private router: Router) { }

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
    return this.router.navigate(['/booking/edit/' + booking_id]);
  }

  // Delete the booking contents
  deletebooking(booking_id) {
    const confirmation = confirm('Are you sure want to remove this booking? ' );
    if (confirmation == true ) {
      this.bookingService.deleteBooking(booking_id).subscribe((data) => {
        this.showSuccess();
          this.data = data;
      });
    } else {
      //nothing
    }
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Booking information has been sucessfully deleted!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
