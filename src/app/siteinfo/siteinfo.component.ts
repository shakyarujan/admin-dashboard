import { Component, OnInit } from '@angular/core';
import { SiteinfoService } from '../service/siteinfo.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siteinfo',
  templateUrl: './siteinfo.component.html',
  styleUrls: ['./siteinfo.component.scss']
})
export class SiteinfoComponent implements OnInit {

  siteInfoData: any = [];
  siteDataId: any = [];
  createForm: FormGroup;

  constructor(private siteInfo: SiteinfoService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      site_name: ['', Validators.required],
      cover_photo: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
      linkedin: ['', Validators.required],
      address: ['', Validators.required],
      about_us: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSiteData();
  }

  // Get site Info
  getSiteData() {
    this.siteInfo.getSiteInfo().subscribe(res => {
      return this.siteInfoData = res;
    });
  }

  // Get site info id
  getSiteDataId(site_info_id) {
      this.router.navigate(['/site/info/edit/' + site_info_id]);
  }

  // Add site info
  addSiteInfo(site_name, cover_photo, contact_number, email, facebook, instagram,
    twitter, linkedin, address, about_us) {
    this.siteInfo.addSiteInfo(site_name, cover_photo, contact_number, email, facebook, instagram,
      twitter, linkedin, address, about_us).subscribe(() => {
        this.router.navigate(['/site/info']);
        console.log('adding site informatio');
      });
  }

}
