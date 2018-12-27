import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { SiteinfoService } from '../service/siteinfo.service';

@Component({
  selector: 'app-what-we-do-edit',
  templateUrl: './what-we-do-edit.component.html',
  styleUrls: ['./what-we-do-edit.component.scss']
})
export class WhatWeDoEditComponent implements OnInit {

	id: String;
	iconPhotoFile;
	icon_photo;
	iconDetails: any = [];
	updateForm: FormGroup;
  name;

  constructor(private siteInfo: SiteinfoService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    private http: HttpClient) { 
  	this.createForm();
  }

   createForm() {
    this.updateForm = this.fb.group({
    	icon_name: ['', Validators.required],
      icon_description: ['', Validators.required],
      icon_photo: ['', Validators.required]
    });
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params.site_icon_id;
      console.log(this.id);
  		this.siteInfo.getIconById(this.id).subscribe(res => {
        console.log(res);
  			this.iconDetails = res;

  			this.icon_photo = this.iconDetails[0].icon_path;

        console.log(this.icon_photo);

  			this.iconPhotoFile = this.icon_photo.split('https://api-sh.paisamanager.com/icon/')[1];
         

  			this.updateForm.get('icon_name').setValue(this.iconDetails[0].icon_name);
  			this.updateForm.get('icon_description').setValue(this.iconDetails[0].icon_description);
  			this.updateForm.get('icon_photo').setValue(this.iconDetails[0].icon_photo);
  		});
  	});

  }

   editIcon(icon_name, icon_description) {
  	const iconData = {
  		site_icon_id: this.id,
  		icon_name: icon_name,
  		icon_path: this.icon_photo,
  		icon_description: icon_description,
  		icon_fileName: this.name
  	}; 

    console.log(iconData);

  	const formData: any = new FormData();

  	// photo upload
  	const file1: Array<File> = this.iconPhotoFile;
  	formData.append('icons[]', file1[0], file1[0]['name']);
  	this.http.post('https://api-sh.paisamanager.com/upload/icon', formData).pipe(
  		map((files: any) => files.json())
  		).subscribe(files => {});
  	// photo upload
	

  	this.siteInfo.updateIcon(iconData).subscribe(res => {
      this.showSuccess();
  		this.router.navigate(['/whatWeDo']);
  	});

  }

  iconPhotoUpload(fileInput: any) {
  	this.iconPhotoFile = <Array<File>>fileInput.target.files;
    this.name = fileInput.target.files[0]['name'];
  	this.icon_photo = 'https://api-sh.paisamanager.com/icon/' + fileInput.target.files[0]['name'];
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Icon details has been updated Sucessfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Customer review has been added Sucessfully', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//



}
