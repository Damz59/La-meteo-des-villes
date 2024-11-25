import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagerService } from '../messager.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [],
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  public ville: string = '';
  private map: L.Map | undefined;
  private apiKey = 'bb912cf532f0ac3d539be4695136f54e'; 
  public cityCoordinates: { lat: number, lon: number } | null = null;

  constructor(private readonly messager: MessagerService, private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap(); // Initialisation de la carte dans ngOnInit

    this.messager.recevoirMessage().subscribe({
      next: (message: string) => {
        console.log('Message reçu:', message);
        this.ville = message;
        this.getCityCoordinates(this.ville);
      }
    });
  }

  private initMap(): void {
    // Assurez-vous que l'élément DOM est prêt
    if (!this.map) {
      this.map = L.map('map').setView([0, 0], 2);
      const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      console.log('Tile Layer URL:', tileLayerUrl);
      L.tileLayer(tileLayerUrl, {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }
  }

  getCityCoordinates(cityName: string): void {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
    console.log('API URL for geocoding:', apiUrl);

    this.http.get(apiUrl).subscribe((response: any) => {
      console.log('API Response:', response);
      if (response && response.length > 0) {
        const { lat, lon } = response[0];
        this.cityCoordinates = { lat, lon };
        console.log(`Coordinates of ${cityName}:`, this.cityCoordinates);
        this.updateMap(cityName);
      } else {
        console.error('City not found');
      }
    }, error => {
      console.error('Error fetching coordinates:', error);
    });
  }

  private updateMap(ville: string): void {
    if (this.cityCoordinates && this.map) {
      const { lat, lon } = this.cityCoordinates;
      console.log(`Updating map for ${ville} at coordinates:`, { lat, lon });

      this.map.setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(this.map)
        .bindPopup(ville)
        .openPopup();
    }
  }
}