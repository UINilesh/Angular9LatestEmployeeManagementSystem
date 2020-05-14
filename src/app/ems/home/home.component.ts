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
  // checkall checkbox
  isEmployee: boolean = false;
  checkAllEmployees: boolean = false;

  selectEmployeName = null;
  showlist = null;
  searchString: any;
  employees: any;

  // pagination code here
  p: number = 1;
  collection: any[];

  // option sort value 
  optionvalue=[5,10,15,20];

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
    if (confirm('Are you sure to delete')) {
      console.log('Implement delete functionality here');
      this._empService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }

  download() {
    this._empService.downloadFile(this.employees, 'jsontocsv');
  }

  changeEmployeeData(event) {
    if (event.target.name == 'checkEmployee') {
      this.isEmployee = true;
    }

    if (this.isEmployee && this.checkAllEmployees) {
      event.target.checked = true;
    }
  }

  allcheckbox(event) {
    const checked = event.target.checked;
    this.employees.forEach((item) => (item.selected = checked));
  }
}
