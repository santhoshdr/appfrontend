import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 


private _registerUrl = "http://localhost:8085/guest/addUser"
private _loginURL= 'http://localhost:8085/api/auth/signin'
constructor(private httpClient : HttpClient) {}


  registerUser(registrationData: {}): any {
    return this.httpClient.post<any>(this._registerUrl,registrationData);
  }

  loginUser(user){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
         });    
         let options = {
      headers: httpHeaders
         };

    console.log("USERS================" + user ) 
    return this.httpClient.post<any>(this._loginURL,user);
  }

loggedIn(){
  return !!localStorage.getItem("accessToken")
}

}
