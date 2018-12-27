import { Component, OnInit } from '@angular/core';
import { PackageService } from '../service/package.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.scss']
})
export class PackageViewComponent implements OnInit {

  id: String;
  packageinfoData: any = [];

  constructor(private packageData: PackageService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
      this.getTripData();
    }

  ngOnInit() {
  }

  // Get trip data from Id
  getTripData() {
    this.route.params.subscribe(params => {
      this.id = params.trip_id;
      console.log(this.id);
      this.packageData.gettripDataId(this.id).subscribe(res => {
        console.log(res);
        return this.packageinfoData = res;
      });
    });
  }

  // Edit Package
  editPackageData(trip_id) {
    console.log(trip_id);
    this.router.navigate(['/package/edit/' + trip_id]);
  }

}
