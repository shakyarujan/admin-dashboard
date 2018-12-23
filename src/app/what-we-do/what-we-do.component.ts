import { Component, OnInit } from '@angular/core';
import { SiteinfoService } from '../service/siteinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  info: any = [];
  constructor(private siteinfo: SiteinfoService,
    private route: Router
    ) { }

  ngOnInit() {
    this.siteinfo.getSiteInfo().subscribe(res => {
      return this.info = res;
    });
  }

  siteInfo(site_info_id) {
    this.route.navigate(['/siteinfoEdit/', site_info_id]);
  }

}
