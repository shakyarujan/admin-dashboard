import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-review-view',
  templateUrl: './customer-review-view.component.html',
  styleUrls: ['./customer-review-view.component.scss']
})
export class CustomerReviewViewComponent implements OnInit {

  dataReview: any = [];
  id: String;

  constructor(private review: ReviewService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getReview();
  }

  // get review
  getReview() {
    this.route.params.subscribe(params => {
      this.id = params.review_id;
      console.log(this.id);
      this.review.getReivewId(this.id).subscribe(res => {
        return this.dataReview = res;
      });
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

}
