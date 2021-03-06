import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  // Show Trip data
  gettripData() {
    return this.http.get(environment.appConfig.apiUrl + '/trip/all/');
  }

  // Get Trip data Id
  gettripDataId(trip_id) {
    return this.http.get(environment.appConfig.apiUrl + '/trip/id/' + trip_id);
  }

  // Deleting the records
  deletePackage(trip_id) {
    return this.http.delete(environment.appConfig.apiUrl + '/delete/trip/id/' + trip_id );
  }

  // Add Trip Package
  addPackage(packageData) {
    console.log(packageData);
    return this.http.post(environment.appConfig.apiUrl + '/add/trip', packageData);
  }

  // update Trip Package
  updateTrip(packageData) {
    return this.http.put(environment.appConfig.apiUrl + '/update/trip', packageData);
  }

  // Checking the feature trip
  getFeaturedTrip() {
    return this.http.get(environment.appConfig.apiUrl + '/trip/featured');
  }

}
