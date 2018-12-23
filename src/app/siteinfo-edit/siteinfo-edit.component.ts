import { Component, OnInit } from '@angular/core';
import { SiteinfoService } from '../service/siteinfo.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-siteinfo-edit',
  templateUrl: './siteinfo-edit.component.html',
  styleUrls: ['./siteinfo-edit.component.scss']
})
export class SiteinfoEditComponent implements OnInit {

  id: String;
  siteinfoData: any = [];
  updateForm: FormGroup;
  cover_photoFile;
  cover_photo;
  about_us;

  constructor(private siteInfo: SiteinfoService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      site_name: ['', Validators.required],
      cover_photo: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
      linkedin: ['', Validators.required],
      address: ['', Validators.required],
      about_us: ['', Validators.required],
      homepage_text: ['', Validators.required],
      what_we_do: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.site_info_id;
      this.siteInfo.getSiteInfoId(this.id).subscribe(res => {
        this.siteinfoData = res;

        this.about_us = this.siteinfoData[0].about_us;
        this.cover_photo = this.siteinfoData[0].cover_photo;
        this.cover_photoFile = this.cover_photo.split('https://api-sh.paisamanager.com/cover/')[1];


        this.updateForm.get('site_name').setValue(this.siteinfoData[0].site_name);


        this.updateForm.get('contact_number').setValue(this.siteinfoData[0].contact_number);
        this.updateForm.get('email').setValue(this.siteinfoData[0].email);
        this.updateForm.get('facebook').setValue(this.siteinfoData[0].facebook);
        this.updateForm.get('instagram').setValue(this.siteinfoData[0].instagram);
        this.updateForm.get('twitter').setValue(this.siteinfoData[0].twitter);
        this.updateForm.get('linkedin').setValue(this.siteinfoData[0].linkedin);
        this.updateForm.get('address').setValue(this.siteinfoData[0].address);
        this.updateForm.get('about_us').setValue(this.siteinfoData[0].about_us);
        this.updateForm.get('homepage_text').setValue(this.siteinfoData[0].homepage_text);
        this.updateForm.get('what_we_do').setValue(this.siteinfoData[0].what_we_do);
      });
    });
  }

  onSubmit(fb: FormGroup) {
    console.log(fb);
  }

  updateSiteInfo(id, site_name, contact_number, email, facebook, instagram,
    twitter, linkedin, address, about_us, homepage_text, what_we_do) {

      const siteInfo = {
        site_info_id: id,
        site_name: site_name,
        contact_number: contact_number,
        email: email,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        linkedin: linkedin,
        address: address,
        about_us: about_us,
        cover_photo: this.cover_photo,
        homepage_text: homepage_text,
        what_we_do: what_we_do
      };

      console.log(siteInfo);

      const formData:  any = new FormData();
      // photo upload
      const file1: Array<File> = this.cover_photoFile;
      formData.append('coverphoto[]', file1[0], file1[0]['name']);
      this.http.post('https://api-sh.paisamanager.com/upload/cover', formData).pipe(
        map((files: any) => files.json())
      ).subscribe(file => {});

    this.siteInfo.updateSiteInfo(siteInfo).subscribe(() => {
      this.showSuccess();
      this.router.navigate(['/siteinfo']);
    });

  }

  coverPhotoUpload(fileInput: any) {
    this.cover_photoFile = <Array<File>>fileInput.target.files;
    this.cover_photo = 'https://api-sh.paisamanager.com/cover/' + fileInput.target.files[0]['name'];
  }

    // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Sucessfully Updated!', 'Update!');
  }

  showDanger() {
    this.toastr.warning('Please enter the Form Credential', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
 