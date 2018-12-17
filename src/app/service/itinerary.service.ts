import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private http: HttpClient) { }

  getItineraryData(trip_id) {
    return this.http.get(environment.appConfig.apiUrl + '/trip/itinerary/' + trip_id);
  }

  getImageByID(trip_id) {
    return this.http.get(environment.appConfig.apiUrl + '/trip/image/' + trip_id);
  }

  updateItinerary(data) {
    return this.http.put(environment.appConfig.apiUrl + '/update/trip/itinerary', data);
  }

  getCategoryByID(category_id) {
    return this.http.get(environment.appConfig.apiUrl + '/category/id/' + category_id);
  }
}
