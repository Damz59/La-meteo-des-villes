import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessagerService } from '../messager.service';

@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  public formulaireVille = new FormControl('');
  public meteo: any;

  constructor(private readonly http: HttpClient, private readonly messager: MessagerService) {}

  ngOnInit(): void {
    this.messager.recevoirMessage().subscribe({
      next: (message: string) => {
        this.formulaireVille.setValue(message);
        this.obtenirDonneesMeteo();
      }
    });
  }

  obtenirDonneesMeteo() {
    const ville = this.formulaireVille.value;
    const apiKey = 'bb912cf532f0ac3d539be4695136f54e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

    this.http.get(url).subscribe({
      next: (reponse) => {
        this.meteo = reponse;
        console.log('Données météo:', this.meteo);
      },
      error: (erreur) => {
        console.error('Erreur lors de la récupération des données météo:', erreur);
        this.meteo = null;
      }
    });
  }

  convertirDirectionVent(degrees: number): string {
    const directions = [
      'Nord', 'Nord-Nord-Est', 'Nord-Est', 'Est-Nord-Est',
      'Est', 'Est-Sud-Est', 'Sud-Est', 'Sud-Sud-Est',
      'Sud', 'Sud-Sud-Ouest', 'Sud-Ouest', 'Ouest-Sud-Ouest',
      'Ouest', 'Ouest-Nord-Ouest', 'Nord-Ouest', 'Nord-Nord-Ouest'
    ];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}
