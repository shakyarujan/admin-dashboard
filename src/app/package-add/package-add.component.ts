import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../service/category.service';
import { PackageService } from '../service/package.service';


@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.scss']
})
export class PackageAddComponent implements OnInit {

  createForm: FormGroup;
  choose: string[];
  typeList: string[];
  difficultyList: string[];
  tripPhotoFile;
  cover_photo;
  seasonList = [];
  files;
  photoArray: any = [];
  addDescriptionArray;
  categoryService: any = [];
  featuredDeal;


  constructor(
    private service: PackageService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private serviceCategory: CategoryService,
    private router: Router) {

      this.createForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        cover_photo: ['', Validators.required],
        duration: ['', Validators.required],
        type: ['', Validators.required],
        difficulty: ['', Validators.required],
        season: ['', Validators.required],
        overview: ['', Validators.required],
        altitude: ['', Validators.required],
        rating: ['', Validators.required],
        keyword: ['', Validators.required],
        category: ['', Validators.required],
        festivalOffer: ['', Validators.required],
        festivalPrice: ['', Validators.required],
        specialDeal: ['', Validators.required],
        featureDeal: ['', Validators.required],
      });
    }


  ngOnInit() {
    this.choose = ['Yes', 'No'];
    this.typeList = ['Inbound', 'Outbound'];
    this.difficultyList = ['Easy', 'Moderate', 'High'];
    this.photoArray = [];
    this.addDescriptionArray = [];

    this.serviceCategory.getCategoryData().subscribe(res => {
      console.log(res);
      return this.categoryService = res;
    });
  }

  addPackageTest(fg: FormGroup) {
    const name = fg.value.name;
    const category_id = fg.value.category;
    const price = fg.value.price;
    const cover_photo = this.cover_photo;
    const duration = fg.value.duration;
    const type = fg.value.type;
    const difficulty = fg.value.difficulty;
    const season = this.seasonList.toString();
    const overview = fg.value.overview;
    const altitude = fg.value.altitude;
    const rating = fg.value.rating;
    const keyword = fg.value.keyword;
    const festivalOffer = fg.value.festivalOffer;
    var festivalPrice = fg.value.festivalPrice;
    const specialDeal = fg.value.specialDeal;
    // const featuredDeal = fg.value.featureDeal;
    const status = 'Active';
    const itinerary = this.addDescriptionArray;
    const photos = this.photoArray;

    if(this.featuredDeal == ''){
      var featuredDeal = fg.value.featureDeal;
    }else{
      var featuredDeal = this.featuredDeal;
    }

    if(festivalPrice == null || festivalOffer == 'no' || festivalOffer == 'No'){
      festivalPrice = 0;
    }

    const newTrip = {
        name,
        category_id,
        price,
        cover_photo ,
        duration,
        type,
        difficulty,
        season,
        overview,
        altitude,
        rating,
        keyword ,
        festivalOffer,
        festivalPrice,
        specialDeal,
        featuredDeal,
        status,
        itinerary,
        photos
    };

    console.log(newTrip);

    // ---------- Photo Uploading ---------------------- //
    const formData: any = new FormData();

    const file1: Array<File> = this.tripPhotoFile;
    formData.append('packagephoto[]', file1[0], file1[0]['name']);
    this.http.post('https://api-sh.paisamanager.com/upload', formData).pipe(
      map((files: any) => files.json())
      ).subscribe(files => {});
    // ---------- End of Photo Uploading ---------------------- //


    // ---------- Multiple Photo Uploading ---------------------- //

    const file: Array<File> = this.files;
    for (let i = 0; i < this.files.length; i++) {
      formData.append('uploads[]', file[i], file[i]['name']);
    }
    this.http.post('https://api-sh.paisamanager.com/upload', formData).pipe(map((files: any) => files.json())).subscribe(files => {});

  // ---------- End of Multiple Photo Uploading ---------------------- //


    this.service.addPackage(newTrip).subscribe( res => {
    });
    this.showSuccess();
    // this.router.navigate(['/package']);
    // location.reload();
}


  // ---------------------Trip Reviwer Photo Upload ------------------ //

  tripPhotoUpload(fileInput: any) {
    this.tripPhotoFile = <Array<File>>fileInput.target.files;
    this.cover_photo = 'https://api-sh.paisamanager.com/images/' + fileInput.target.files[0]['name'];
  }

  // ---------------------End of Trip Reviwer Photo Upload ------------------ //



  // ---------------------Trip Multiple Photo Upload ------------------ //
  onChange(event: any) {
    this.files = [].slice.call(event.target.files);

    for (let i = 0; i < this.files.length; i++) {
      this.photoArray.push({
          photo_url: 'https://api-sh.paisamanager.com/images/' + this.files[i]['name'],
          photo: this.files[i]['name']
      });
    }
  }
  // ---------------------ENd Trip Multiple Photo Upload ------------------ //



  // ---------------------Trip Season Checked ------------------ //
  checkSeason(season) {
    console.log(season.length);
    if (this.seasonList.length === null) {
      this.seasonList.push(season);
    } else {
      if (this.seasonList.indexOf(season) !== -1) {
        const index = this.seasonList.indexOf(season);
        this.seasonList.splice(index, 1);
      } else {
        this.seasonList.push(season);
      }
    }
  }

  // ---------------------End of Trip Season Checked ------------------ //




  // ---------------------Itinerary Adding------------------ //
  addDescriptionField(day, description) {
    console.log('...........................');
      console.log(day);
      console.log(description);
    if (day == '' || description == '') {
      alert(' Please fill-up the form before submitting ');
    } else {
      document.getElementById('descriptionTable').style.display = '';
      this.addDescriptionArray.push({
        'trip_day': day,
        'description': description
      });
      console.log(this.addDescriptionArray);

      const emptyDay = <HTMLInputElement>document.getElementById('day');
      const emptyDescription = <HTMLInputElement>document.getElementById('description');

       emptyDay.value = '';
       emptyDescription.value = '';
    }
  }

  // ---------------------End of Itinerary Adding------------------ //

   
  // ---------------------Delete Itinerary Adding------------------ //
   isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  deleteDescriptionArray(day){
    for(var i = 0; i < this.addDescriptionArray.length; i++){
      if(this.isEquivalent(this.addDescriptionArray[i],day)){
        this.addDescriptionArray.splice(i,1);
        break;
      }
    }
  }

  // ---------------------End ofDelete Itinerary Adding------------------ //



  // --------------------- Show festival Offer price --------------------- //
  festivalPriceShow(offer) {
    const festivaloffer = document.getElementById('festivalPrice');
    if (offer == 'Yes' || offer == 'yes') {
      festivaloffer.style.display = '';
    } if (offer == 'No' || offer == 'no') {
      festivaloffer.style.display = 'none';
    }
  }

  // --------------------- Show festival Offer price --------------------- //


  // --------------------- Checked featured trip -----------------------------//
  checkFeaturedTrip(item){
    console.log(item);

    if (item == 'Yes') {
    this.service.getFeaturedTrip().subscribe((featuredTrips: any) => {
        if(featuredTrips.length > 0){
          alert('Featured Trip is already available! Cannot have more than on featured trip.');
          }
          this.featuredDeal = 'No';
    });

    } else {
      // nothing
    }
          
        
  }

 // -------------------------- End of Checked featured trip -------------------- //



  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('New Trip Information has been added successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
