import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCategoriesEditComponent } from './package-categories-edit.component';

describe('PackageCategoriesEditComponent', () => {
  let component: PackageCategoriesEditComponent;
  let fixture: ComponentFixture<PackageCategoriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCategoriesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
