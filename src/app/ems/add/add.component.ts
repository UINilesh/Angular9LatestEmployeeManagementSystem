import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../emp.service';
import { Employee } from '../../employee';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addformData: FormGroup;
  submitted = false;

  constructor(
    private empService: EmpService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addformData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addformData.controls;
  }

  model = new Employee();
  addEmployee() {
     if (this.addformData.invalid) {
      return;
    }
    this.empService.addEmployee(this.model).subscribe(() => this.goBack());
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
