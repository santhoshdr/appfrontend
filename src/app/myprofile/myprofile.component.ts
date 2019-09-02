import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private _route: Router,private _userService: UserService) { }

  ngOnInit() {
  }

  editMyProfile(){
    this._route.navigate(['/editMyprofile']);
  }

  getMyProfile(){
    this._route.navigate(['/myProfile']);
  }

}
