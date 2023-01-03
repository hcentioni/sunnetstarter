import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserData } from '../models/user-data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: UserData;

  private url = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {

  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  singUp(user: any) {
    this.url
    return this.http.post<any>(this.url + "login", user)
  }

  loggedIn() {
    let strToken;
    if (sessionStorage.getItem('token')) {
      strToken = sessionStorage.getItem('token')
      if (this.tokenExpired(strToken!)) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }



  getToken() {
    let tokenRetorno: string=''
    if (sessionStorage.getItem('token')){
      tokenRetorno =sessionStorage.getItem('token')!
    }
    return tokenRetorno;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('carrito');
    this.router.navigate(['/login'])
  }


  getUserData() {
    let strToken: string = '';
    if (sessionStorage.getItem('token')) {
      strToken = sessionStorage.getItem('token')!
    }
    // this.userData = (JSON.parse(atob(strToken.split('.')[1])).user)
    // return this.userData

    return JSON.parse(atob(strToken.split('.')[1])).user
  }


}
