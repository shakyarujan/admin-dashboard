import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-customer-review-add',
  templateUrl: './customer-review-add.component.html',
  styleUrls: ['./customer-review-add.component.scss']
})
export class CustomerReviewAddComponent implements OnInit {

  createForm: FormGroup;
  reviewerPhotoFile;
  reviewer_photo;

  constructor(private review: ReviewService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
     private toastr: ToastrService,
    private http: HttpClient) {
      this.createForm = this.fb.group({
        reviewer_name: ['', Validators.required],
        review_title: ['', Validators.required],
        comment: ['', Validators.required],
        reviewer_photo: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  addCustomerReview(reviewer_name, review_title, comment) {

 if( reviewer_name == "" || review_title == "" || comment == "" ) {
   alert('Some mandatory fields are empty!');
 } else {
    const addReview = {
      reviewer_name: reviewer_name,
      review_title: review_title,
      comment: comment,
      reviewer_photo: this.reviewer_photo
    };

  const formData: any = new FormData();

  // photo upload
  const file1: Array<File> = this.reviewerPhotoFile;
  formData.append('reviewers[]', file1[0], file1[0]['name']);
  this.http.post('https://api-sh.paisamanager.com/upload/reviewer', formData).subscribe(files => {});
  // .pipe(
  //   map((files: any) => files.json())
  //   ).subscribe(files => {});
  // photo upload

    this.review.addReview(addReview).subscribe(res => {
      this.showSuccess();
      this.router.navigate(['/customer/review']);
    });

  }

  }

  reviwerPhotoUpload(fileInput: any) {
    this.reviewerPhotoFile = <Array<File>>fileInput.target.files;
    this.reviewer_photo = 'https://api-sh.paisamanager.com/reviews/' + fileInput.target.files[0]['name'];
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Customer review has been added Sucessfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
