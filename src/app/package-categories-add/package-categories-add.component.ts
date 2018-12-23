import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-package-categories-add',
  templateUrl: './package-categories-add.component.html',
  styleUrls: ['./package-categories-add.component.scss']
})
export class PackageCategoriesAddComponent implements OnInit {

  createForm: FormGroup;

  constructor(private categoryInfo: CategoryService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient) {
      this.createForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

  ngOnInit() {
  }

  addCategory(name, description) {
    const newCategory = {
      name: name,
      description: description
    };
    this.categoryInfo.addingCategory(newCategory).subscribe( () => {
         this.showSuccess();
        this.router.navigate(['/packageCategories']);
    });
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Category has been added successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
