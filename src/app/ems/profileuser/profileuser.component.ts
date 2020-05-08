import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from "../../loginservice/auth.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;

  displaydata:any;
  constructor( private router: Router, private dataService:ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.displaydata = this.dataService.getToken();
    console.log(this.dataService.getToken());

    this.profileForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
  });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  profileData() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    console.log(this.profileForm.value);
  }

}
