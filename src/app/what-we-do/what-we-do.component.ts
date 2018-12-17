import { Component, OnInit } from '@angular/core';
import { SiteinfoService } from '../service/siteinfo.service';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  info: any = [];
  constructor(private siteinfo: SiteinfoService) { }

  ngOnInit() {
    this.siteinfo.getSiteInfo().subscribe(res => {
      return this.info = res;
    });
  }

}
