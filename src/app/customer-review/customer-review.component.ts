import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss']
})
export class CustomerReviewComponent implements OnInit {

  dataReview: any = [];

  constructor(private review: ReviewService, private router: Router) { }

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
    const confirmation = confirm('Are you sure? ' );
    if (confirmation == true ) {
      this.review.deleteReview(review_id).subscribe((data) => {
        this.dataReview = data;
    });
    } else {
      //nothing
    }
  }

  // Get the customer review
  customerReview(review_id) {
    this.router.navigate(['/customerReviewView/' + review_id]);
  }

  // edit review
  editReview(review_id){
    this.router.navigate(['/customerReviewEdit/' + review_id]);
  }

}
