import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editmyprofile',
  templateUrl: './editmyprofile.component.html',
  styleUrls: ['./editmyprofile.component.css']
})
export class EditmyprofileComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit() {
  }

  getMyProfile(){
    this._route.navigate(['/myProfile']);
  }

  saveUserDetails(){
    alert("Here in editMyprofile")
    this._route.navigate(['/editMyprofile'])
  }

}
