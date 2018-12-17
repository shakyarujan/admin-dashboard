import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-package-categories-add',
  templateUrl: './package-categories-add.component.html',
  styleUrls: ['./package-categories-add.component.scss']
})
export class PackageCategoriesAddComponent implements OnInit {

  createForm: FormGroup;

  constructor(private categoryInfo: CategoryService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
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
         console.log('added');
        this.router.navigate(['/packageCategories']);
    });
  }

}
