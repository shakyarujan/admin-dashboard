import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-package-categories-edit',
  templateUrl: './package-categories-edit.component.html',
  styleUrls: ['./package-categories-edit.component.scss']
})
export class PackageCategoriesEditComponent implements OnInit {

  id: String;
  categoryinfoData: any = [];
  updateForm: FormGroup;

  constructor(private categoryInfo: CategoryService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient) {
      this.createForm();
     }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.category_id;
      console.log('..........');
      console.log(this.id);

      this.categoryInfo.getCategoryId(this.id).subscribe(res => {
        this.categoryinfoData = res;

        console.log(this.categoryinfoData);
        this.updateForm.get('name').setValue(this.categoryinfoData[0].name);
        this.updateForm.get('description').setValue(this.categoryinfoData[0].description);
      });
    });
  }

  updateCategory(id, name, description) {

    if ( name == "" || description == "") {
      alert("Some mandatory fields are empty!");
    } else {
       const category = {
        category_id: id,
        name: name,
        description: description
      };

      this.categoryInfo.updateingCategory(category).subscribe(res => {
        this.showSuccess();
        this.router.navigate(['/packageCategories']);
      });
    }
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('Category has been updated successfully!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//



}
