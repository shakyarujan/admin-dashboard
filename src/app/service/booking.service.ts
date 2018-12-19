import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  // Adding Booking records
  addBooking(contact_name, contact_email, mobile, no_of_adult,
    no_of_children, desired_start_date, desired_end_date, name) {
    const booking = {
      trip_id: '1',
      contact_name: contact_name,
      contact_email: contact_email,
      mobile: mobile,
      no_of_adult: no_of_adult,
      no_of_children: no_of_children,
      desired_start_date: desired_start_date,
      desired_end_date: desired_end_date,
      name: name,
      booking_status: 'Confirmed'
    };

    console.log(booking);


    return this.http.post(environment.appConfig.apiUrl + '/add/booking', booking );
  }

  // Getting all booking record
  getBookingData() {
    return this.http.get(environment.appConfig.apiUrl + '/booking/all');
  }


  // Update the booking records
  updateBooking(booking) {
    return this.http.put(environment.appConfig.apiUrl + '/update/booking', booking );
  }

  // Deleting the records
  deleteBooking(booking_id) {
      return this.http.delete(environment.appConfig.apiUrl + '/delete/booking/' + booking_id );
  }

  // Get booking id
  getBookingId(booking_id) {
    return this.http.get(environment.appConfig.apiUrl + '/booking/id/' + booking_id);
  }

  // Get all trip data
  tripData() {
    return this.http.get(environment.appConfig.apiUrl + '/trip/all');
  }

  // Total Booking
  totalBooking() {
    return this.http.get(environment.appConfig.apiUrl + '/total/booking');
  }

  // Confirm Booking
  confirmBooking() {
    return this.http.get(environment.appConfig.apiUrl + '/total/confirmed/booking');
  }

  // Pending Booking
  pendingBooking() {
    return this.http.get(environment.appConfig.apiUrl + '/total/pending/booking');
  }

}
