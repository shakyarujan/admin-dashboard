import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routing';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from '../../node_modules/ng2-ckeditor';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SiteinfoComponent } from './siteinfo/siteinfo.component';
import { PackageComponent } from './package/package.component';
import { ClientMsgComponent } from './client-msg/client-msg.component';
import { BookingComponent } from './booking/booking.component';
import { PageTopBarComponent } from './page-top-bar/page-top-bar.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { PackageAddComponent } from './package-add/package-add.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { ClientMsgViewComponent } from './client-msg-view/client-msg-view.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { PackageCategoriesComponent } from './package-categories/package-categories.component';
import { PackageCategoriesAddComponent } from './package-categories-add/package-categories-add.component';
import { PackageCategoriesEditComponent } from './package-categories-edit/package-categories-edit.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { CustomerReviewViewComponent } from './customer-review-view/customer-review-view.component';
import { PackageTypeComponent } from './package-type/package-type.component';
import { PackageTypeAddComponent } from './package-type-add/package-type-add.component';
import { PackageTypeEditComponent } from './package-type-edit/package-type-edit.component';
import { SiteinfoEditComponent } from './siteinfo-edit/siteinfo-edit.component';
import { ComposeClientMsgComponent } from './compose-client-msg/compose-client-msg.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { WhatWeDoEditComponent } from './what-we-do-edit/what-we-do-edit.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { CustomerReviewAddComponent } from './customer-review-add/customer-review-add.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { BackgroundImageAddComponent } from './background-image-add/background-image-add.component';


import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
import { BookingService } from './service/booking.service';
import { SiteinfoService } from './service/siteinfo.service';
import { PackageService } from './service/package.service';
import { CategoryService } from './service/category.service';
import { ItineraryService } from './service/itinerary.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SidebarComponent,
    LoginComponent,
    SiteinfoComponent,
    PackageComponent,
    ClientMsgComponent,
    BookingComponent,
    PageTopBarComponent,
    BookingEditComponent,
    BookingAddComponent,
    PackageAddComponent,
    PackageEditComponent,
    ClientMsgViewComponent,
    UsersComponent,
    UsersAddComponent,
    PackageCategoriesComponent,
    PackageCategoriesAddComponent,
    PackageCategoriesEditComponent,
    UsersEditComponent,
    UserProfileComponent,
    CustomerReviewComponent,
    CustomerReviewViewComponent,
    PackageTypeComponent,
    PackageTypeAddComponent,
    PackageTypeEditComponent,
    SiteinfoEditComponent,
    ComposeClientMsgComponent,
    WhatWeDoComponent,
    WhatWeDoEditComponent,
    UsersViewComponent,
    PackageViewComponent,
    CustomerReviewAddComponent,
    BackgroundImageComponent,
    BackgroundImageAddComponent
  ],
  imports: [
    routes,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService,
    BookingService,
    AuthGuard,
    SiteinfoService,
    PackageService,
    CategoryService,
    ItineraryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
