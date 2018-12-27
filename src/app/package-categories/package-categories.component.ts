import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-package-categories',
  templateUrl: './package-categories.component.html',
  styleUrls: ['./package-categories.component.scss']
})
export class PackageCategoriesComponent implements OnInit {

  categoryData: any = [];
  categoryCheckData: any = [];

  constructor(private category: CategoryService,
   private toastr: ToastrService, 
   private router: Router) { }

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
  this.router.navigate(['/package/categories/edit/' + category_id]);
  }

 // Delete the booking contents
  deletebooking(category_id) {
    const confirmation = confirm('Are you sure want to remove this category?' );
    if (confirmation == true ) {
      this.category.checkingCategory(category_id).subscribe( res => {
        this.categoryCheckData = res;
        if(!this.categoryCheckData.length) {

          this.category.deletingCategory(category_id).subscribe((data) => {
            this.showSuccess();
            this.categoryData = data;
          });
        }  else {
           alert('Category cannot be deleted, Some trips are dependent on this category.');
        }

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
