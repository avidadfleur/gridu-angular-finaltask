import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';

import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { UsersInfoComponent } from './users/users-info/users-info.component';
import { UsersProfileComponent } from './users/users-profile/users-profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WelcomeComponent,
    AboutComponent,
    UsersComponent,
    UsersInfoComponent,
    UsersProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    WelcomeComponent,
    AboutComponent,
    UsersComponent,
    UsersInfoComponent,
    UsersProfileComponent
  ]
})
export class HomeModule { }
