import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req,next){
    let tokenizedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem("accessToken"))
    })
    return next.handle(tokenizedRequest);
  }
}
