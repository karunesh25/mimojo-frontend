import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'http://localhost:8080/api/test/';
const Mimojo_APIM_URL = 'https://mimijo-apim.azure-api.net/Mimojo-Business/';
const Strapi_URL = 'http://localhost:1337/api/';
const StrapiAuth = 'bearer eee80441623e7b4fd11021e5b193505d624c819f19d47b1c6f95e7dc1141e9ae7553cef20ab273a1ea40cbf3365c2430a08a598126dbc042e9bfe00dbd460bb2a001d30603da1ce0a0793b51e1e13ca03b692778bc2e734e6cc0bf8787255445cd3c3aac0aecc162e7e2eb28794e989f290576840206e377504b0c447f5af797';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200/' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getWeather(name: string): Observable<any> {
    return this.http.get(Mimojo_APIM_URL + 'GetWeatherReport' + '?name=' + name, { responseType: 'json' });
  }
  getProfile(userid: string): Observable<any> {

    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.tokenStorage.getToken() })
    };
    return this.http.post(Mimojo_APIM_URL + 'GetProfile', {
      userid
    }, httpOptionsAuth);
  }
  getCountries(): Observable<any> {
    return this.http.get(Mimojo_APIM_URL + 'GetCountries', { responseType: 'json' });
  }
  getUserCountries(userid: string): Observable<any> {
    return this.http.post(Mimojo_APIM_URL + 'GetUserCountries', {
      userid
    }, httpOptions);
  }
  addUserCountry(userId: string, country: string): Observable<any> {
    return this.http.post(Mimojo_APIM_URL + 'AddUserCountry', {
      userId,
      country
    }, httpOptions);
  }
  getPackages(): Observable<any> {
    let headers = new HttpHeaders();
        headers = headers.set('Authorization', StrapiAuth);
    return this.http.get(Strapi_URL + 'weather-products', {  headers: headers,  responseType: 'json'  
    });
  }
}