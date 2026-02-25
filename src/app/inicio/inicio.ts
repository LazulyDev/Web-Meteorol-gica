import { Component } from '@angular/core';
import { Meteo } from '../services/meteo';
import { MeteoResponse } from '../models/meteo.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  weatherData?: MeteoResponse
  // get current weather using city given
  constructor(private meteo: Meteo) { }
  getMeteoCity(ciudad: string) {
      return this.meteo.getMeteoCity(ciudad).subscribe(data => {
        this.weatherData = data;
      }
    )
  }

  // on process DO NOT USE! yet ;)
  // get weather using current possition
  getMeteoCoordinates(lat: string, log: string) {
    return this.meteo.getMeteoCoordinates(lat, log)
  }
}
