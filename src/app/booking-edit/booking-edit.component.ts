import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {PackageService } from '../service/package.service';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {

  id: String;
  trip_id;
  booking: any = {};
  updateForm: FormGroup;
  changeState: string[];
  tripname: any = [];
  name;
  children;

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private servicePackage: PackageService) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      contact_name: ['', Validators.required],
      contact_email: ['', Validators.required],
      mobile: ['', Validators.required],
      no_of_adult: ['', Validators.required],
      no_of_children: ['', Validators.required],
      desired_start_date: ['', Validators.required],
      desired_end_date: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.changeState = ['Confirmed', 'Review Pending', 'Canceled'];

    // Get form data to update
    this.route.params.subscribe(params => {
      this.id = params.booking_id;
      this.bookingService.getBookingId(this.id).subscribe(res => {
        this.booking = res;
        this.trip_id = this.booking[0].trip_id;
        this.name = this.booking[0].name;

        this.children = this.booking[0].no_of_children;

        if( this.children == null || this.children == '') {
          this.children = 0;
        }

        this.updateForm.get('contact_name').setValue(this.booking[0].contact_name);
        this.updateForm.get('contact_email').setValue(this.booking[0].contact_email);
        this.updateForm.get('mobile').setValue(this.booking[0].mobile);
        this.updateForm.get('no_of_adult').setValue(this.booking[0].no_of_adult);
        this.updateForm.get('no_of_children').setValue(this.booking[0].no_of_children);
        this.updateForm.get('desired_start_date').setValue(this.booking[0].desired_start_date);
        this.updateForm.get('desired_end_date').setValue(this.booking[0].desired_end_date);
        this.updateForm.get('name').setValue(this.booking[0].trip_id);
        this.updateForm.get('status').setValue(this.booking[0].booking_status);
      });
    });

    // Fetch the package trip name
    this.servicePackage.gettripData().subscribe((res: any) => {
      this.tripname = res;
    });


  }

  updatebooking(contact_name, contact_email, mobile, no_of_adult, no_of_children, desired_start_date, desired_end_date, name, status) {

    if(contact_name == "" || contact_email == "" || mobile == "" || no_of_adult == "" || desired_start_date == "" || desired_end_date == "" || name == "" ) {
      alert("Some mandatory fields are empty!");
    } else {
    const bookingData = {
      booking_id: this.id,
      trip_id: name,
      contact_name: contact_name,
      contact_email: contact_email,
      mobile: mobile,
      no_of_adult: no_of_adult,
      no_of_children: no_of_children,
      desired_start_date: desired_start_date,
      desired_end_date: desired_end_date,
      booking_status: status
    }

    this.bookingService.updateBooking(bookingData).subscribe( () => {
        this.showSuccess();
        this.router.navigate(['/booking']);
    });

    }
  }


  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Booking Information has been updated successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


 // ------------ End Toast message ------------------------------//


}
