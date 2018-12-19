import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-review-edit',
  templateUrl: './customer-review-edit.component.html',
  styleUrls: ['./customer-review-edit.component.scss']
})
export class CustomerReviewEditComponent implements OnInit {
	

	updateForm: FormGroup;
	reviewerPhotoFile;
	reviewer_photo;
	id: String;
	reviewData: any = [];

  constructor(private review: ReviewService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { 
  		this.updateForm = this.fb.group({
        reviewer_name: ['', Validators.required],
        review_title: ['', Validators.required],
        comment: ['', Validators.required],
        reviewer_photo: ['', Validators.required]
      });
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.id = params.review_id;
      
      console.log(this.id);

      this.review.getReivewId(this.id).subscribe(res => {
        this.reviewData = res;

        this.reviewer_photo = this.reviewData[0].reviewer_photo;
        this.reviewerPhotoFile = this.reviewer_photo.split('https://api-sh.paisamanager.com/reviews/')[1];

        this.updateForm.get('reviewer_name').setValue(this.reviewData[0].reviewer_name);
        this.updateForm.get('review_title').setValue(this.reviewData[0].review_title);
        this.updateForm.get('comment').setValue(this.reviewData[0].comment);
      });
    });
  }

  editCustomerReview(reviewer_name, review_title, comment) {
    const editReview = {
      review_id: this.id,
      reviewer_name: reviewer_name,
      review_title: review_title,
      comment: comment,
      reviewer_photo: this.reviewer_photo
  };

  console.log(editReview);

  const formData: any = new FormData();

  // photo upload
 	const file1: Array<File> = this.reviewerPhotoFile;
          formData.append("reviewers[]", file1[0], file1[0]['name']);
          this.http.post('https://api-sh.paisamanager.com/upload/reviewer', formData)
          .pipe(map((files:any) => files.json())).subscribe(files => {});
  // photo upload

    this.review.updateReview(editReview).subscribe(res => {
    });
    this.router.navigate(['/customerReview']);
    location.reload();

  }

  reviwerEditPhotoUpload(fileInput: any) {
   this.reviewerPhotoFile = <Array<File>>fileInput.target.files;
   this.reviewer_photo = 'https://api-sh.paisamanager.com/reviews/'+fileInput.target.files[0]['name'];
  }

}
