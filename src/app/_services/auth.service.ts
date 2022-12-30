import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const Registration_URL = 'https://mimijo-apim.azure-api.net/Mimojo-frontdoor/';
const Mimojo_APIM_URL = 'https://mimijo-apim.azure-api.net/Mimojo-Business/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200/' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(userId: string, password: string): Observable<any> {
    return this.http.post(Mimojo_APIM_URL + 'login', {
      userId,
      password
    }, httpOptions);
  }

  register(userid: string, emailid: string, password: string , name: string, mobile: string, address: string,
     country: string, city: string, postalcode : string, subscription: string, 
      cardname: string, expiry: string, cvv: string,
      currency : string, amount : Number, cardbin : string, cardlast4 : string): Observable<any> {

    let reg = this.http.post(Registration_URL + 'Registration', {
      userid,
      emailid,
      password,
      name,
      mobile,
      address,
      country,
      city
    }, httpOptions);

    let payment = this.http.post(Registration_URL + 'Payment', {
      userid,
      expiry,
      date : Date,
      amount : amount,
      currency : currency,
      cardbin : cardbin,
      cardlast4 : cardlast4,
      cardname : cardname
    }, httpOptions);

    let sub = this.http.post(Registration_URL + 'Subscription', {
      userid,
      subscription,
      country,
      purchaseDate : Date,
      expiryDate : Date,
    }, httpOptions);

    return forkJoin([reg, payment, sub]);

    //return sub;
  }
}