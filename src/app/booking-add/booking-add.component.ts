import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {PackageService } from '../service/package.service';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.scss']
})
export class BookingAddComponent implements OnInit {

  createForm: FormGroup;
  changeState: string[];
  tripname: any = [];
  tripData: any = [];
  trip_id;

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private router: Router,
    private servicePackage: PackageService) {
    this.createForm = this.fb.group({
      contact_name: ['', Validators.required],
      contact_email: ['', Validators.required],
      mobile: ['', Validators.required],
      no_of_adult: ['', Validators.required],
      no_of_children: ['', Validators.required],
      desired_start_date: ['', Validators.required],
      desired_end_date: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.changeState = ['Confirmed', 'Pending', 'Canceled'];

    // fetching data from trip package
    this.servicePackage.gettripData().subscribe((res: any) => {

      // for (let i = 0; i < res.length; i++) {
      //   this.tripname.push(res[i].name);
      // }
      return this.tripData = res;
    });

  }

  // onsubmit(fb: FormGroup) {


  //   const booking = [];
  //   booking['contact_name'] = this.createForm.value['contact_name'];
  //   booking['contact_email'] = this.createForm.value['contact_email'];
  //   booking['mobile'] = this.createForm.value['mobile'];
  //   booking['no_of_adult'] = this.createForm.value['no_of_adult'];
  //   booking['no_of_children'] = this.createForm.value['no_of_children'];
  //   booking['desired_start_date'] = this.createForm.value['desired_start_date'];
  //   booking['desired_end_date'] = this.createForm.value['desired_end_date'];

  //   console.log('----------------' + booking);

  //    this.bookingService.addBooking(booking).subscribe( () => {
  //      this.router.navigate(['/booking']);
  //    });
  // }

  // Adding Booking content
  addbooking(contact_name, contact_email, mobile, no_of_adult, no_of_children, desired_start_date, desired_end_date) {

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


    this.bookingService.addBooking(contact_name, contact_email, mobile, no_of_adult, no_of_children,
       desired_start_date, desired_end_date, name).subscribe( () => {

         console.log('added');
        this.router.navigate(['/booking']);
    });
  }
}
