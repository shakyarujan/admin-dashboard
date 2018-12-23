import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  // get review data
  getReview() {
    return this.http.get(environment.appConfig.apiUrl + '/review/get/all');
  }

  // get revire id
  getReivewId(review_id) {
    return this.http.get(environment.appConfig.apiUrl + '/review/id/' + review_id);
  }

  // Delete Review
  deleteReview(review_id) {
    return this.http.delete(environment.appConfig.apiUrl + '/delete/review/' + review_id);
  }

  // Update Review
  updateReview(updatereview) {
    return this.http.put(environment.appConfig.apiUrl + '/update/review', updatereview);
  }

  // Add Review
  addReview(addreview) {
    return this.http.post(environment.appConfig.apiUrl + '/add/review', addreview);
  }
}
