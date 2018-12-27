import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss']
})
export class CustomerReviewComponent implements OnInit {

  dataReview: any = [];

  constructor(private review: ReviewService,
  private toastr: ToastrService, 
  private router: Router) { }

  ngOnInit() {
    this.getReview();
  }

  // get review
  getReview() {
    this.review.getReview().subscribe(res => {
      return this.dataReview = res;
    });
  }

  // Get Review Id and delete
  deleteReview(review_id) {
    const confirmation = confirm('Are you sure, you want to remove this review?' );
    if (confirmation == true ) {
      this.review.deleteReview(review_id).subscribe((data) => {
        this.showSuccess();
        this.dataReview = data;
    });
    } else {
      //nothing
    }
  }

  // Get the customer review
  customerReview(review_id) {
    this.router.navigate(['/customer/review/view/' + review_id]);
  }

  // Get Customer Id
  getCustomerId(review_id) {
    this.router.navigate(['/customer/review/edit/' + review_id]);
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Customer review has been sucessfully deleted!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
