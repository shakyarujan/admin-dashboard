import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PackageService } from '../service/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  tripData: any =  [];
  data: any = [];

  constructor(private service: PackageService,
   private toastr: ToastrService, 
    private router: Router) { }

  ngOnInit() {
    this.getPackageData();
  }

  // Get All package Data
  getPackageData() {
    this.service.gettripData().subscribe((res: any) => {
      return this.tripData = res.reverse();
    });
  }

  // Edit Package
  editPackageData(trip_id) {
    this.router.navigate(['/package/edit/' + trip_id]);
  }

  // Edit Package
  viewPackageData(trip_id) {
    this.router.navigate(['/package/view/' + trip_id]);
  }

  // Delete Pakage
  deletePackage(trip_id) {
    const confirmation = confirm('Are you sure want to remove this Package trip?' );
    if (confirmation == true ) {
      this.service.deletePackage(trip_id).subscribe((data) => {
          this.showSuccess();   
          this.tripData = data;
      });
    } else {
      //nothing
    }
  }


  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Package has been sucessfully deleted!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//
}
