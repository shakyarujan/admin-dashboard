import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-customer-review-edit',
  templateUrl: './customer-review-edit.component.html',
  styleUrls: ['./customer-review-edit.component.scss']
})
export class CustomerReviewEditComponent implements OnInit {

	id: String;
	customerData: any = [];
	reviewerPhotoFile;
	reviewer_photo;
	updateForm: FormGroup;

  constructor(private review: ReviewService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    private http: HttpClient) {
  		this.createForm();
    }

   createForm() {
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
  		this.review.getReivewId(this.id).subscribe(res => {
  			this.customerData = res;

  			this.reviewer_photo = this.customerData[0].reviewer_photo;
  			this.reviewerPhotoFile = this.reviewer_photo.split('https://api-sh.paisamanager.com/reviews/')[1];

  			this.updateForm.get('reviewer_name').setValue(this.customerData[0].reviewer_name);
  			this.updateForm.get('review_title').setValue(this.customerData[0].review_title);
  			this.updateForm.get('comment').setValue(this.customerData[0].comment);
  			this.updateForm.get('reviewer_photo').setValue(this.customerData[0].reviewer_photo);
  		});
  	});

  }

  updateCustomerReview(reviewer_name, review_title, comment) {
     if( reviewer_name == "" || review_title == "" || comment == "" ) {
       alert('Some mandatory fields are empty!');
     } else {
       const customerData = {
         review_id: this.id,
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
  	// 	map((files: any) => files.json())
  	// 	).subscribe(files => {});
  	// photo upload
	

    	this.review.updateReview(customerData).subscribe(res => {
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
    this.toastr.success('Customer review has been updated Sucessfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Customer review has been added Sucessfully', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//


}
