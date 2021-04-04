import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../model/postiion';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {
  location;
  userPosition = new Position();
  constructor(private httpClient: HttpClient ) {
  }

  getCityPosition(cityName: string): Observable<any>{
    return this.httpClient.get(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=7f43792cfe0e41cba73988504451e191`);
  }

  getCity(queryTxt: string): Observable<object>{
    return this.httpClient.get(`http://localhost:4200/api?key=7c756203dbb38590a66e01a5a3e1ad96&q=${queryTxt}`);
  }

  
}

