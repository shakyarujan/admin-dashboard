import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ItineraryService } from '../service/itinerary.service';
import { PackageService } from '../service/package.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss']
})
export class PackageEditComponent implements OnInit {

  id: String;
  packageinfoData: any = [];
  categoryService: any = [];
  choose: string[];
  seasonList: string[];
  typeList: string[];
  difficultyList: string[];
  tripPhotoFile;
  cover_photo;
  files;

  cover_photoFile;
  category_id;

  seasonArray;
  summer;
  winter;
  autumn;
  spring;
  an
  fesOffer;
  fesPrice;
  speDeal;
  featureDeal;
  category_name;


  itineraryArray: any = [];
  newItineraryArray = [];
  deleteItineraryArray = [];

  allPhoto;
  deletePhoto = [];
  photoArray: any = [];

  editItineraryID;
  editItineraryDay;
  editItineraryDescription;

  updateForm: FormGroup;

  constructor(private packageData: PackageService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private serviceCategory: CategoryService,
    private itinerary: ItineraryService,
    private toastr: ToastrService,
    private http: HttpClient) {
      this.createForm();
     }

  ngOnInit() {
    this.choose = ['Yes', 'No'];
    this.typeList = ['Inbound', 'Outbound'];
    this.difficultyList = ['Easy', 'Moderate', 'High' ];
    this.newItineraryArray = [];
    this.photoArray = [];
    this.deletePhoto = [];
    this.deleteItineraryArray = [];

    var editItinerary = <HTMLElement>document.getElementById('edit-itinerary');
    editItinerary.style.display = 'none';

    this.route.params.subscribe(params => {
      this.id = params.trip_id;

      this.packageData.gettripDataId(this.id).subscribe(res => {
        this.packageinfoData = res;
        this.category_id = this.packageinfoData[0].category_id;

        this.itinerary.getCategoryByID(this.category_id).subscribe((categoryInfo) => {
        	this.category_name = categoryInfo[0].name;
        });

        this.cover_photo = this.packageinfoData[0].cover_photo;
        this.tripPhotoFile = this.cover_photo.split('https://api-sh.paisamanager.com/upload/')[1];
        this.seasonList = this.packageinfoData[0].season.split(',');
        for (let i = 0; i < this.seasonList.length; i++) {
          switch (this.seasonList[i]) {
          case 'summer': this.summer = true; break;
          case 'winter': this.winter = true; break;
          case 'spring': this.spring = true; break;
          case 'autumn': this.autumn = true; break;
        }
        };


        this.fesOffer = this.packageinfoData[0].festivalOffer;
        this.fesPrice = this.packageinfoData[0].festivalPrice;
        this.speDeal = this.packageinfoData[0].specialDeal;
        this.featureDeal = this.packageinfoData[0].featuredDeal;

        this.itinerary.getItineraryData(this.id).subscribe((itinerary) => {
          this.itineraryArray = itinerary;
        });

        this.serviceCategory.getCategoryData().subscribe(res => {
          this.categoryService = res;
        });

        this.itinerary.getImageByID(this.id).subscribe((image) => {
          this.allPhoto = image;
        });

        // Festival price shown or not at first 

        if(this.fesOffer == 'Yes'){
          var festiveOffer = <HTMLInputElement>document.getElementById('festivalPrice');
          festiveOffer.style.display = '';
        }else{ 
          var festiveOffer = <HTMLInputElement>document.getElementById('festivalPrice');
          festiveOffer.style.display = 'none';
        }

        // Festival price shown or not at first 

        this.cover_photoFile = this.cover_photo.split('https://api-sh.paisamanager.com/images/')[1];
        this.updateForm.get('name').setValue(this.packageinfoData[0].name);
        this.updateForm.get('price').setValue(this.packageinfoData[0].price);
        this.updateForm.get('duration').setValue(this.packageinfoData[0].duration);
        this.updateForm.get('difficulty').setValue(this.packageinfoData[0].difficulty);
        this.updateForm.get('type').setValue(this.packageinfoData[0].type);
        this.updateForm.get('overview').setValue(this.packageinfoData[0].overview);
        this.updateForm.get('altitude').setValue(this.packageinfoData[0].altitude);
        this.updateForm.get('rating').setValue(this.packageinfoData[0].rating);
        this.updateForm.get('keyword').setValue(this.packageinfoData[0].keyword);
        this.updateForm.get('festivalOffer').setValue(this.packageinfoData[0].festivalOffer);
        this.updateForm.get('festivalPrice').setValue(this.packageinfoData[0].festivalPrice);
        this.updateForm.get('specialDeal').setValue(this.packageinfoData[0].specialDeal);
        this.updateForm.get('featuredDeal').setValue(this.packageinfoData[0].featuredDeal);
        this.updateForm.get('status').setValue(this.packageinfoData[0].status);
      });
    });

  }

  createForm() {
    this.updateForm = this.fb.group({
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
      festivalOffer: ['', Validators.required],
      festivalPrice: ['', Validators.required],
      specialDeal: ['', Validators.required],
      featuredDeal: ['', Validators.required],
      status: ['', Validators.required]
    });
  }


  updatePackage(name, type, category, price, duration, difficulty, altitude, rating, keyword,
    festivalPrice, overview) {

  

  if (festivalPrice == null || festivalPrice == "" || this.fesOffer == 'no' || this.fesOffer == 'No') {
        festivalPrice = 0;
  }


  if(name == "" || category == "" || price == "" || duration == "" || type == "" || difficulty == "" || overview == "" ||
        altitude == "" || rating == "" || keyword == ""
      ) {
      alert("Some mandatory fields are empty!");
    } else if (this.seasonList.length == 0) {
      alert('Please choose season for the trip');
    } else if (this.photoArray.length == 0) {
      alert('Please choose at least one photo to upload');
    } else {

    const packageData = {
          trip_id: this.id,
          name: name,
          category_id: this.categoryService[0].category_id,
          price: price,
          cover_photo: this.cover_photo,
          duration: duration,
          season: this.seasonList.toString(),
          type: type,
          difficulty: difficulty,
          rating: rating,
          overview: overview,
          altitude: altitude,
          keyword: keyword,
          festivalOffer: this.fesOffer,
          festivalPrice: festivalPrice,
          specialDeal: this.speDeal,
          featuredDeal: this.featureDeal,
          status: 'Active',
          itinerary: this.itineraryArray,
          newItinerary: this.newItineraryArray,
          photos: this.allPhoto,
          newPhotos: this.photoArray,
          deletePhoto: this.deletePhoto,
          deleteItinerary: this.deleteItineraryArray
    };

    const formData: any = new FormData();

    // ----------------photo upload------------------- //
      if(this.tripPhotoFile != undefined){
        const file1: Array<File> = this.tripPhotoFile;
        formData.append('uploads[]', file1[0], file1[0]['name']);
        this.http.post('https://api-sh.paisamanager.com/upload', formData).pipe(
          map((files: any) => files.json())
          ).subscribe(files => {});
      }
     // ----------------End photo upload------------------- //


     console.log(packageData);

    this.packageData.updateTrip(packageData).subscribe(res => {
    });
    this.showSuccess();
      // alert('Updated Successfully');
      // this.router.navigate(['/package']);
      // location.reload();

  }
    
}



  // ---------------------Trip Reviwer Photo Upload ------------------ //
  tripPhotoUpload(fileInput: any) {
    this.tripPhotoFile = <Array<File>>fileInput.target.files;
    this.cover_photo = 'https://api-sh.paisamanager.com/upload/' + fileInput.target.files[0]['name'];
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
      this.seasonList = [];
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


  // -------------------- Festival Price shown -------------------- //

  festivalPriceShow(offer) {
    const festivaloffer = document.getElementById('festivalPrice');
    if (offer == 'Yes' || offer == 'yes') {
      this.fesOffer = offer;
      festivaloffer.style.display = '';
    } if (offer == 'No' || offer == 'no') {
      this.fesOffer = offer;
      festivaloffer.style.display = 'none';
    }
  }

  // ----------------- End of festival price shown ----------------- //



  // ----------------- Special Deal -------------------------------- //
  specialDealTest(offer){
    console.log(offer);
    if(offer == 'Yes'){
      this.speDeal = offer;
    }if(offer == 'No'){
      this.speDeal = offer;
    }
  }

  // ------------------- end of special deal ------------------------ //



  // ---------------------------- checked Feature deal ------------------------ //
  checkFeaturedTrip(offer){
    if(offer == 'Yes'){
      this.featureDeal = offer;
    }if(offer == 'No'){
      this.featureDeal = offer;
    }

    this.packageData.getFeaturedTrip().subscribe((featuredTrips: any) => {
      if(this.id != featuredTrips[0].trip_id){
        if(featuredTrips.length > 0){
          alert('Featured Trip is already available! Cannot have more than on featured trip.');

          this.updateForm.get('featuredDeal').setValue(this.packageinfoData[0].featuredDeal);
          this.featureDeal = 'No';
        }
      }else{
        //nothing
      }
    });
  }

// --------------------------- checked featured deal ------------------------------------- //


  // ---------------------Itinerary Adding------------------ //
  addDescriptionField(day, description) {
    if (day == '' || description == '') {
      alert(' Please fill-up the form before submitting ');
    } else {
      this.newItineraryArray.push({
        'trip_day': day,
        'description': description
      });

      const emptyDay = <HTMLInputElement>document.getElementById('day');
      const emptyDescription = <HTMLInputElement>document.getElementById('description');

       emptyDay.value = '';
       emptyDescription.value = '';
    }
  }

  // ---------------------End of Itinerary Adding------------------ //


  // ---------------------Delete Itinerary Adding------------------ //
  deleteDescription(item) {
    for (let i = 0; i < this.newItineraryArray.length; i++) {
      this.newItineraryArray.splice(i, 1);
      break;
    }
  }

  //   ---------------------End ofDelete Itinerary Adding------------------ //



  // ----------------------- Array Equivalent checking -------------------- //
  isEquivalent(a, b) {
    // Create arrays of property names
    const  aProps = Object.getOwnPropertyNames(a);
    const  bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

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
 
  // ----------------- End of Array Euivalent ------------------- //


  // -------------------Old description array ---------------------//
  deleteDescriptionArray(day) {
    this.deleteItineraryArray.push(day);

    for (let i = 0; i < this.itineraryArray.length; i++) {
      if (this.isEquivalent(this.itineraryArray[i], day)) {
        this.itineraryArray.splice(i, 1);
        break;
      }
    }
  }

  // ------------------- End of Old description array ---------------------//


  // -------------------- New description array -----------------------------//
  deleteNewDescriptionArray(day) {
    for (let i = 0; i < this.newItineraryArray.length; i++) {
      if (this.isEquivalent(this.newItineraryArray[i], day)) {
        this.newItineraryArray.splice(i, 1);
        break;
      }
    }
  }

  // -------------------- End of New description array -----------------------------//


  // ---------------------- Old photo array ---------------------------------------//
  deletePhotoArray(photo) {
    this.deletePhoto.push(photo);

    for (let i = 0; i < this.allPhoto.length; i++) {
      if (this.isEquivalent(this.allPhoto[i], photo)) {
        this.allPhoto.splice(i, 1);
        break;
      }
    }
  }

  // ---------------------- End of Old photo array ---------------------------------------//

  
  // ----------------------- New photo array --------------------------------------//
  deleteNewPhotoArray(photo) {
    for (let  i = 0; i < this.photoArray.length; i++) {
      if (this.isEquivalent(this.photoArray[i], photo)) {
        this.photoArray.splice(i, 1);
        break;
      }
    }
  }

  // ------------------------ End of New photo array --------------------- //


  
  // ------------------------ updating itinerary ---------------------- //

  editDescriptionArray(itinerary) {
    
    this.editItineraryID = itinerary.itinerary_id;
    this.editItineraryDay = itinerary.day;
    this.editItineraryDescription = itinerary.description;

    const  editItinerary = <HTMLElement>document.getElementById('edit-itinerary');
    editItinerary.style.display = 'block';

    const oldItinerary = <HTMLElement>document.getElementById('itinerary');
    oldItinerary.style.display = 'none';
  }

  editNewDescriptionArray(newItinerary) {
    console.log(newItinerary);
    //this.editItineraryDay = newItinerary.trip_day.split(' ')[1];
    this.editItineraryDay = newItinerary.trip_day;
    this.editItineraryDescription = newItinerary.description;

    const editItinerary = <HTMLElement>document.getElementById('edit-itinerary');
    editItinerary.style.display = 'block';

    const oldItinerary = <HTMLElement>document.getElementById('itinerary');
    oldItinerary.style.display = 'none';
  }

  updateItinerary(editDay, editDescription) {
    if (this.editItineraryID == undefined) {
      if (editDay == null || editDay == ' ' || editDay == '' || editDescription == null || editDescription == ' ' || editDescription == ''){
        alert('Empty field cannot be added');
      } else {
        var day = editDay;

        for (let i = 0; i < this.newItineraryArray.length; i++) {
           if (this.newItineraryArray[i].trip_day == day) {
              this.newItineraryArray[i].description = editDescription;
              break; // Stop this loop, we found it!
           } else if (this.newItineraryArray[i].description == editDescription) {
              this.newItineraryArray[i].trip_day = day;
              break; //Stop this loop, we found it!
           } else {
             //nothing
           }
        }

        alert('Itinerary updated successfully');

        const editItinerary = <HTMLElement>document.getElementById('edit-itinerary');
        editItinerary.style.display = 'none';

        const oldItinerary = <HTMLElement>document.getElementById('itinerary');
        oldItinerary.style.display = 'block';
      }
    } else {
      const update = {
        itinerary_id: this.editItineraryID,
        trip_id: this.id,
        day: editDay,
        description: editDescription
      };

      console.log(update);

      this.itinerary.updateItinerary(update).subscribe((data) => {
          this.itineraryArray = data;
          alert('Itinerary updated successfully');

          const editItinerary = <HTMLElement>document.getElementById('edit-itinerary');
          editItinerary.style.display = 'none';

          const oldItinerary = <HTMLElement>document.getElementById('itinerary');
          oldItinerary.style.display = 'block';
      });
    }

  }

  // ---------------------------- End of Update Itinerary------------------------------//

   // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Trip Information has been updated successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//


}
