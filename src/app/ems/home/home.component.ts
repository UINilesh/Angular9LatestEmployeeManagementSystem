import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../emp.service';
import { Employee } from '../../employee';
import { ApiService } from '../../loginservice/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // define select variable
 
  selectEmployeName = null;
  searchString: any;
  employees: any;

  // pagination code here
  p: number = 1;
  collection: any[];

  constructor(
    private _empService: EmpService,
    private router: Router,
    private dataService: ApiService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.selectEmployeName;
  }

  getEmployees() {
    this._empService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  deleteEmployee(id) {
    if (confirm('Are you sure to delete ' + id)) {
      console.log('Implement delete functionality here');
      this._empService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }

  // name filter code here 
  /* fruits: string[] = ["Apple", "Banana", "Orange", "Peach", "Pear", ];
 */
 
  
  isAscendic = true
  employeessort:string[any];
 
  send() {
    this.isAscendic?this.ascendic():this.descendic()
   }

 ascendic(){
   this.isAscendic = false;
    this.employees = this.employees.sort((n1,n2) => {
   if (n1 < n2) {
       return 1;
   }
   if (n1 > n2) {
       return -1;
   }
   return 0;
});
}

 descendic(){
   this.isAscendic = true
   this.employees = this.employees.sort((n1,n2) => {
   if (n1 > n2) {
       return 1;
   }
   if (n1 < n2) {
       return -1;
   }
   return 0;
});
 }  

 download(){
  this._empService.downloadFile(this.employees, 'jsontocsv');
}
 

  
}
