import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SiteinfoService } from '../service/siteinfo.service';


@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  info: any = [];
  iconData:any = [];
  
  constructor(private siteinfo: SiteinfoService,
    private toastr: ToastrService, 
    private route: Router
  ) { }

  ngOnInit() {
    this.getIcon();
    this.siteinfo.getSiteInfo().subscribe(res => {
      return this.info = res;
    });
  }

  siteInfo(site_info_id) {
    this.route.navigate(['/site/info/edit/', site_info_id]);
  }

  getIcon() {
    this.siteinfo.getIcon().subscribe( res => {
      return this.iconData = res;
    });
  }

  editIconData(site_icon_id) {
    this.route.navigate(['/site/whatwedo/icon/edit/' + site_icon_id]);
  }

  deleteIcon(site_icon_id) {
   const confirmation = confirm('Are you sure want to remove this icon?' );
    if (confirmation == true ) {
      this.siteinfo.deleteIcon(site_icon_id).subscribe((data) => {
          this.showSuccess();   
          this.iconData = data;
      });
    } else {
      //nothing
    }
  }


  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Icon has been sucessfully deleted!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
