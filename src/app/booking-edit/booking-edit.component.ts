import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {PackageService } from '../service/package.service';

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

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private router: Router,
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
    this.changeState = ['Confirmed', 'Pending', 'Canceled'];

    // Get form data to update
    this.route.params.subscribe(params => {
      this.id = params.booking_id;
      console.log('........insideTS.......');
      console.log(this.id);
      this.bookingService.getBookingId(this.id).subscribe(res => {
        this.booking = res;
        console.log(this.booking[0].name);
        this.trip_id = this.booking[0].trip_id;
        this.updateForm.get('contact_name').setValue(this.booking[0].contact_name);
        // this.updateForm.get('lastname').setValue(this.booking.lastname);
        this.updateForm.get('contact_email').setValue(this.booking[0].contact_email);
        this.updateForm.get('mobile').setValue(this.booking[0].mobile);
        this.updateForm.get('no_of_adult').setValue(this.booking[0].no_of_adult);
        this.updateForm.get('no_of_children').setValue(this.booking[0].no_of_children);
        this.updateForm.get('desired_start_date').setValue(this.booking[0].desired_start_date);
        this.updateForm.get('desired_end_date').setValue(this.booking[0].desired_end_date);
        this.updateForm.get('name').setValue(this.booking[0].name);
        this.updateForm.get('status').setValue(this.booking[0].status);
      });
    });

    // Fetch the package trip name
    this.servicePackage.gettripData().subscribe((res: any) => {
      this.tripname = res;
    });


  }

  updatebooking(contact_name, contact_email, mobile, no_of_adult, no_of_children, desired_start_date, desired_end_date, name, status) {
    this.bookingService.updateBooking(this.id, this.trip_id, contact_name, contact_email, mobile, no_of_adult, no_of_children,
       desired_start_date, desired_end_date, name, status).subscribe( () => {
        this.router.navigate(['/index']);
    });
  }




}
