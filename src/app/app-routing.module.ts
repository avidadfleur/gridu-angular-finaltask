import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

import { AboutComponent } from './home/about/about.component';
import { StatusComponent } from './status.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { UsersComponent } from './home/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersInfoComponent } from './home/users/users-info/users-info.component';
import { UsersProfileComponent } from './home/users/users-profile/users-profile.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent,
    children: [
      {path: 'users-info', component: UsersInfoComponent},
      {path: ':id', component: UsersProfileComponent, pathMatch: 'prefix'},
    ],
    canActivate: [AuthGuard]
  },
  {path: "access", 
    loadChildren:()=>import('./access/access.module')
    .then(opt=>opt.AccessModule)
  },
  {path: '**', component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
