import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';


import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PackageComponent } from './package/package.component';
import { SiteinfoComponent } from './siteinfo/siteinfo.component';
import { ClientMsgComponent } from './client-msg/client-msg.component';
import { BookingComponent } from './booking/booking.component';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { BookingReviewPendingComponent } from './booking-review-pending/booking-review-pending.component';
import { PackageAddComponent } from './package-add/package-add.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { ClientMsgViewComponent } from './client-msg-view/client-msg-view.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { PackageCategoriesComponent } from './package-categories/package-categories.component';
import { PackageCategoriesAddComponent } from './package-categories-add/package-categories-add.component';
import { PackageCategoriesEditComponent } from './package-categories-edit/package-categories-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { CustomerReviewViewComponent } from './customer-review-view/customer-review-view.component';
import { CustomerReviewEditComponent } from './customer-review-edit/customer-review-edit.component';
import { PackageTypeComponent } from './package-type/package-type.component';
import { PackageTypeAddComponent } from './package-type-add/package-type-add.component';
import { PackageTypeEditComponent } from './package-type-edit/package-type-edit.component';
import { SiteinfoEditComponent } from './siteinfo-edit/siteinfo-edit.component';
import { ComposeClientMsgComponent } from './compose-client-msg/compose-client-msg.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { WhatWeDoEditComponent } from './what-we-do-edit/what-we-do-edit.component';
import { WhatWeDoAddComponent } from './what-we-do-add/what-we-do-add.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { CustomerReviewAddComponent } from './customer-review-add/customer-review-add.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { BackgroundImageAddComponent } from './background-image-add/background-image-add.component';


export const router: Routes = [

    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'dashboard', component: IndexComponent, canActivate: [AuthGuard] },
    { path: 'package', component: PackageComponent, canActivate: [AuthGuard] },
    { path: 'site/info', component: SiteinfoComponent, canActivate: [AuthGuard] },
    { path: 'clientmsg', component: ClientMsgComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'booking/add', component: BookingAddComponent, canActivate: [AuthGuard] },
    { path: 'booking/edit/:booking_id', component: BookingEditComponent, canActivate: [AuthGuard] },
    { path: 'booking/review-pending', component: BookingReviewPendingComponent, canActivate: [AuthGuard] },
    { path: 'package/add', component: PackageAddComponent, canActivate: [AuthGuard] },
    { path: 'package/edit/:trip_id', component: PackageEditComponent, canActivate: [AuthGuard] },
    { path: 'clientMsgView', component: ClientMsgViewComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'usersAdd', component: UsersAddComponent, canActivate: [AuthGuard] },
    { path: 'usersEdit', component: UsersEditComponent, canActivate: [AuthGuard] },
    { path: 'package/categories', component: PackageCategoriesComponent, canActivate: [AuthGuard] },
    { path: 'package/categories/add', component: PackageCategoriesAddComponent, canActivate: [AuthGuard] },
    { path: 'package/categories/edit/:category_id', component: PackageCategoriesEditComponent, canActivate: [AuthGuard] },
    { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'customer/review', component: CustomerReviewComponent, canActivate: [AuthGuard] },
    { path: 'customer/review/view/:review_id', component: CustomerReviewViewComponent, canActivate: [AuthGuard] },
    { path: 'customer/review/edit/:review_id', component: CustomerReviewEditComponent, canActivate: [AuthGuard] },
    { path: 'packageType', component: PackageTypeComponent, canActivate: [AuthGuard] },
    { path: 'packageTypeAdd', component: PackageTypeAddComponent, canActivate: [AuthGuard] },
    { path: 'packageTypeEdit', component: PackageTypeEditComponent, canActivate: [AuthGuard] },
    { path: 'site/info/edit/:site_info_id', component: SiteinfoEditComponent, canActivate: [AuthGuard] },
    { path: 'composeClientMsg', component: ComposeClientMsgComponent, canActivate: [AuthGuard] },
    { path: 'site/whatwedo/icon', component: WhatWeDoComponent, canActivate: [AuthGuard] },
    { path: 'site/whatwedo/icon/edit/:site_icon_id', component: WhatWeDoEditComponent, canActivate: [AuthGuard] },
    { path: 'site/whatwedo/icon/add', component: WhatWeDoAddComponent, canActivate: [AuthGuard] },
    { path: 'usersView', component: UsersViewComponent, canActivate: [AuthGuard] },
    { path: 'package/view/:trip_id', component: PackageViewComponent, canActivate: [AuthGuard] },
    { path: 'customer/review/add', component: CustomerReviewAddComponent, canActivate: [AuthGuard] },
    { path: 'backgroundImage', component: BackgroundImageComponent, canActivate: [AuthGuard] },
    { path: 'backgroundImageAdd', component: BackgroundImageAddComponent, canActivate: [AuthGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, {useHash: true});
