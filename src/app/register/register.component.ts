import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationData={}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }


  registerUser(){
        this._auth.registerUser(this.registrationData).subscribe(
        res => console.log(res),
        err => console.log(err)
)




  }

}
