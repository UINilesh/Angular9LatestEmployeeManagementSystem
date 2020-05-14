import { Component, OnInit,HostListener } from '@angular/core';
import { ApiService } from "../../loginservice/auth.service";
import { Subject } from 'rxjs/Subject';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarCollapsed = true;
  loginbtn: boolean;
  logoutbtn: boolean;
  displayname:any;

  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private dataService: ApiService) {
    dataService.getLoggedInName.subscribe((name) => this.changeName(name));

    if (this.dataService.isLoggedIn()) {
      console.log("loggedin");
       
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
   }

   private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  logout() {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
  }

  ngOnInit(): void {
     // print name on admin page 
     this.displayname = this.dataService.getToken();
     console.log(this.dataService.getToken());

     this.setTimeout();
 this.userInactive.subscribe(() => {
   this.logout();
 }); 

  }

  setTimeout() {
    this.userActivity = setTimeout(() => {
      if (this.dataService.isLoggedIn) {
        this.userInactive.next(undefined);
        console.log('logged out');
      }
    },420000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  collapsed = true;
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
}
