import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {PackageService } from '../service/package.service';
import { BookingService } from '../service/booking.service';

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
    private toastr: ToastrService,
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


  //   console.log('----------------' + booking);

  //    this.bookingService.addBooking(booking).subscribe( () => {
  //      this.router.navigate(['/booking']);
  //    });
  // }

  // Adding Booking content
  addbooking(contact_name, contact_email, mobile, no_of_adult, no_of_children, desired_start_date, desired_end_date) {
    this.bookingService.addBooking(contact_name, contact_email, mobile, no_of_adult, no_of_children,
       desired_start_date, desired_end_date, name).subscribe( () => {
         console.log('added');
        this.router.navigate(['/booking']);
    });
  }


  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Booking Information has been added successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//
}
