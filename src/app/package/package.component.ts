import { Component, OnInit } from '@angular/core';
import { PackageService } from '../service/package.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  tripData: any =  [];
  data: any = [];

  constructor(private service: PackageService, private router: Router) { }

  ngOnInit() {
    this.getPackageData();
  }

  // Get All package Data
  getPackageData() {
    this.service.gettripData().subscribe(res => {
      return this.tripData = res;
    });
  }

  // Edit Package
  editPackageData(trip_id) {
    console.log(trip_id);
    this.router.navigate(['/packageEdit/' + trip_id]);
  }

  // Edit Package
  viewPackageData(trip_id) {
    console.log(trip_id);
    this.router.navigate(['/packageView/' + trip_id]);
  }

  // Delete Pakage
  deletePackage(trip_id) {
    const confirmation = confirm('Are you sure? ' );
    if (confirmation == true ) {
      this.service.deletePackage(trip_id).subscribe((data) => {
          this.tripData = data;
      });
    } else {
      //nothing
    }
  }
}
