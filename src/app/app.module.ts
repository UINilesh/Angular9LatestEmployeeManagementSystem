import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './ems/navbar/navbar.component';
import { AddComponent } from './ems/add/add.component';
import { EditComponent } from './ems/edit/edit.component';
import { HomeComponent } from './ems/home/home.component';
import { ShowComponent } from './ems/show/show.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ApiService } from './loginservice/auth.service';
import { EmpService } from './emp.service';
// authguard 
import { AuthguardGuard } from './guard/authguard.guard';

// search data filter 
import { FilterPipe } from './searchdata/filter.pipe';

import { FilterParentPipe } from './searchdata/filter-parent.pipe';
// after search hightlight text using custom pipe 
import { HighlightPipe } from './searchdata/highlightText';


import { HttpClientModule } from '@angular/common/http';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileuserComponent } from './ems/profileuser/profileuser.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    AddComponent,
    EditComponent,
    HomeComponent,
    ShowComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    FilterParentPipe,
    HighlightPipe,
    ProfileuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ApiService,EmpService,AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
