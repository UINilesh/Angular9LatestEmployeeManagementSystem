import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// shared component data here
import { HomeComponent } from './ems/home/home.component';
import { AddComponent } from './ems/add/add.component';
import { EditComponent } from './ems/edit/edit.component';
import { ShowComponent } from './ems/show/show.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// authguard
import { AuthguardGuard } from './guard/authguard.guard';
import { ProfileuserComponent } from './ems/profileuser/profileuser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    data: { title: 'Welcome to Employee Management System' },
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardGuard],
    data: { title: 'Welcome to Employee Management System' },
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthguardGuard],
    data: { title: 'Add Employee' },
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthguardGuard],
    data: { title: 'Update Employee' },
  },
  {
    path: 'show/:id',
    component: ShowComponent,
    canActivate: [AuthguardGuard],
    data: { title: 'Details Employee' },
  },
  { 
    path: 'profile',
    component:ProfileuserComponent,
    canActivate: [AuthguardGuard],
    data: {title: 'Manage user profile'},
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
