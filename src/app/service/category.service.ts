import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Getting all booking record
  getCategoryData() {
    return this.http.get(environment.appConfig.apiUrl + '/category/all');
  }

  // Get booking id
  getCategoryId(category_id) {
    return this.http.get(environment.appConfig.apiUrl + '/category/id/' + category_id);
  }

  // Adding Category
  addingCategory(newCategory) {
    return this.http.post(environment.appConfig.apiUrl + '/add/category', newCategory);
  }

  // Updating Category
  updateingCategory(updateCategory) {
    return this.http.put(environment.appConfig.apiUrl + '/update/category', updateCategory);
  }

  // Deleting Category
  deletingCategory(category_id) {
    return this.http.delete(environment.appConfig.apiUrl + '/delete/category/' + category_id);
  }

}
