import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCategoriesAddComponent } from './package-categories-add.component';

describe('PackageCategoriesAddComponent', () => {
  let component: PackageCategoriesAddComponent;
  let fixture: ComponentFixture<PackageCategoriesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCategoriesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCategoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
