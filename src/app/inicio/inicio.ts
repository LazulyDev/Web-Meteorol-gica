import { Component, inject, PLATFORM_ID, OnInit, Inject } from '@angular/core';
import { Meteo } from '../services/meteo';
import { MeteoResponse } from '../models/meteo.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {

  lat?: number
  lon?: number
  private map!: L.Map

  constructor(private meteo: Meteo,
    @Inject(PLATFORM_ID) private platformID: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.getCurrentPositionWeatherAndMap()
    }
  }

  weatherData?: MeteoResponse
  // get current weather using city given
  getMeteoCity(ciudad: string) {
    return this.meteo.getMeteoCity(ciudad).subscribe(data => {
      this.weatherData = data
    }
    )
  }

  // on process DO NOT USE! yet ;)
  // get weather using current possition
  getMeteoCoordinates(lat: number, log: number) {
    return this.meteo.getMeteoCoordinates(lat.toString(), log.toString()).subscribe(data => {
      this.weatherData = data
    })
  }

  //initialize decorative map
  async initMapDecor(lat: number, lon: number) {

    if (isPlatformBrowser(this.platformID)) {
      const map = await import('leaflet')

      this.map = map.map('mapa').setView([lat, lon], 13)

      map.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      map.marker([lat, lon]).addTo(this.map).bindPopup("tu posición actual").openPopup()
    }
  }

  // get current position, initialize map (initMapDecor()), and show weather data
  getCurrentPositionWeatherAndMap() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        this.lat = pos.coords.latitude
        this.lon = pos.coords.longitude

        await this.initMapDecor(this.lat!, this.lon!)

        this.getMeteoCoordinates(this.lat!, this.lon!)
      })
    } else {
      console.error("geolocation not found")
    }
  }
}
