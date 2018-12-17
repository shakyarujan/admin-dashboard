import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTypeEditComponent } from './package-type-edit.component';

describe('PackageTypeEditComponent', () => {
  let component: PackageTypeEditComponent;
  let fixture: ComponentFixture<PackageTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
