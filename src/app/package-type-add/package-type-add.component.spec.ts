import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTypeAddComponent } from './package-type-add.component';

describe('PackageTypeAddComponent', () => {
  let component: PackageTypeAddComponent;
  let fixture: ComponentFixture<PackageTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
