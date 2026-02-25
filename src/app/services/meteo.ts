import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeteoResponse } from '../models/meteo.model';


@Injectable({
  providedIn: 'root',
})
export class Meteo {

  private apiKey = "b0b0c3a60f7d29cbeab90f0ec983826a"
  private URL = "https://api.openweathermap.org/data/2.5/weather" //lat=33.44&lon=-94.04&appid={API key}"

  constructor(private http: HttpClient){}

  // on process DO NOT USE! (yet ;) )
  // get weather using current position
  getMeteoCoordinates(lat: string, lon:string){
      return this.http.get(`${this.URL}&lat=${lat}&lon=${lon}&appid${this.apiKey}&units=metric`)
  }

  // get current weather using city given
  getMeteoCity(ciudad:string): Observable<MeteoResponse>{
    return this.http.get<MeteoResponse>(`${this.URL}?q=${ciudad}&appid=${this.apiKey}&units=metric`)
  }
}
