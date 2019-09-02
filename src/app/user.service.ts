import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {
 


private _getUserProfileURL = "http://localhost:8085/user/getMyProfile"

constructor(private httpClient : HttpClient) {}


  getUserProfile(): any {
     return this.httpClient.get(this._getUserProfileURL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("accessToken")})
  })
  
  }

  loggedIn(){
    return !!localStorage.getItem("accessToken")
  }

}
