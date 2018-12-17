import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-categories',
  templateUrl: './package-categories.component.html',
  styleUrls: ['./package-categories.component.scss']
})
export class PackageCategoriesComponent implements OnInit {

  categoryData: any = [];

  constructor(private category: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategory();
  }

  // get review
  getCategory() {
    this.category.getCategoryData().subscribe(res => {
      console.log(res);
      return this.categoryData = res;
    });
  }

  // update the booking content
  editbooking(category_id) {
  this.router.navigate(['/packageCategoriesEdit/' + category_id]);
  }

 // Delete the booking contents
  deletebooking(category_id) {
    const confirmation = confirm('Are you sure? ' );
    if (confirmation == true ) {
      this.category.deletingCategory(category_id).subscribe((data) => {
        this.categoryData = data;
      });
    } else {
      //nothing
    }
 }

}
