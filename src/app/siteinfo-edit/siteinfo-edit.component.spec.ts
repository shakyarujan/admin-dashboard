import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteinfoEditComponent } from './siteinfo-edit.component';

describe('SiteinfoEditComponent', () => {
  let component: SiteinfoEditComponent;
  let fixture: ComponentFixture<SiteinfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteinfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteinfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
