import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessagerService } from '../messager.service';

@Component({
  selector: 'app-ville',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
  public formulaireVille = new FormControl('');
  public ville: any = null;

  constructor(private readonly http: HttpClient, private readonly messager: MessagerService) {}

  ngOnInit(): void {
    console.log('VilleComponent initialisé');
    this.messager.recevoirMessage().subscribe({
      next: (message: string) => {
        console.log('Message reçu dans VilleComponent:', message);
        this.formulaireVille.setValue(message);
        this.obtenirDonneesVille();
      }
    });
  }

  obtenirDonneesVille() {
    const villeNom = this.formulaireVille.value;
    const url = `https://api-adresse.data.gouv.fr/search/?q=${villeNom}&type=municipality&limit=1`;

    console.log("URL de l'API adresse.data.gouv.fr :", url);

    this.http.get(url).subscribe({
      next: (reponse: any) => {
        console.log('Réponse complète de l\'API:', reponse);
        if (reponse.features && reponse.features.length > 0) {
          this.ville = reponse.features[0].properties;
          console.log('Données de la ville sélectionnée:', this.ville);
        } else {
          console.warn('Aucune donnée trouvée pour la ville:', villeNom);
          this.ville = null;
        }
      },
      error: (erreur) => {
        console.error('Erreur lors de la requête à l\'API:', erreur);
        this.ville = null;
      }
    });
  }
}