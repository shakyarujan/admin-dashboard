import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCategoriesComponent } from './package-categories.component';

describe('PackageCategoriesComponent', () => {
  let component: PackageCategoriesComponent;
  let fixture: ComponentFixture<PackageCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
