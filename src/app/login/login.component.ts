import { Component, OnInit, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  getdata;
  errormsg: any;
  loginForm: FormGroup;
  finalappcode: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9,/]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;

  constructor(private Formbuilder: FormBuilder, private router: Router) {
    this.loginForm = Formbuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
  enterkey(keycode) {
    if (keycode == 13)
      this.login();
  }
  login() {
    var getdata = this.loginForm.value;
    var username = getdata.name;
    var password = getdata.password;
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return false;
    }
    else if (username == 'admin' && password == 'admin') {
      delete getdata.password;
      getdata.roleid = 1;
      localStorage.setItem("mes", JSON.stringify(getdata));
      this.router.navigateByUrl('/dashboard');
    }

    else {
      this.errormsg = 'Invalid Username or Password';
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
