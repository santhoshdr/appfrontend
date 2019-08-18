import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private _auth : AuthService,
              private _route: Router) { }

  ngOnInit() {
  }

  loginUser(){

    console.log("In logincomponent" + this.loginUserData )
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
        this._route.navigate(['dashboard']);
      },
      err => console.log(err)
      )
  }


}
