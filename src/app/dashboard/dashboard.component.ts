import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _route: Router,private _userService: UserService) { }

  ngOnInit() {
  }


  logoutUser(){
  localStorage.removeItem("accessToken");
  this._route.navigate(['/login']);

}
}
