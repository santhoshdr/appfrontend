import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';


  constructor(private _route: Router,private _userService: UserService) { }


  logoutUser(){
    localStorage.removeItem("accessToken");
    this._route.navigate(['/login']);
 
  }

  getMyprofile(){
    console.log("In  dashboard")
    this._userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this._route.navigate(['/myProfile']);
      },
      err => console.log(err)
      )
  
}


addWed(){
  this._route.navigate(['/addWed']);
}
}



