import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { SiteinfoService } from '../service/siteinfo.service';

@Component({
  selector: 'app-what-we-do-add',
  templateUrl: './what-we-do-add.component.html',
  styleUrls: ['./what-we-do-add.component.scss']
})
export class WhatWeDoAddComponent implements OnInit {

	createForm: FormGroup;
	iconPhotoFile;
	icon_photo;
  photo_name;

  constructor(private siteInfo: SiteinfoService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
     private toastr: ToastrService,
    private http: HttpClient) {
      this.createForm = this.fb.group({
        icon_name: ['', Validators.required],
        icon_description: ['', Validators.required],
        icon_photo: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  addIcon(icon_name, icon_description) {
    const addIconDetail = {
      icon_name: icon_name,
      icon_path: this.icon_photo,
      icon_description: icon_description,
      icon_fileName: this.photo_name
  };

  console.log(addIconDetail);

  const formData: any = new FormData();

   // photo upload
  const file1: Array<File> = this.iconPhotoFile;
  formData.append('icons[]', file1[0], file1[0]['name']);
  this.http.post('https://api-sh.paisamanager.com/upload/icon', formData).pipe(
    map((files: any) => files.json())
    ).subscribe(files => {});
  // photo upload


    this.siteInfo.addIcon(addIconDetail).subscribe(res => {
      this.showSuccess();
      this.router.navigate(['/whatWeDo']);
    });

  }

  iconPhotoUpload(fileInput: any) {
    this.iconPhotoFile = <Array<File>>fileInput.target.files;
    this.photo_name = fileInput.target.files[0]['name'];
    this.icon_photo = 'https://api-sh.paisamanager.com/icon/' + fileInput.target.files[0]['name'];
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
