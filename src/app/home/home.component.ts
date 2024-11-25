import { Component } from '@angular/core';
import { FormulaireComponent } from "../formulaire/formulaire.component";
import {ReactiveFormsModule, FormControl} from '@angular/forms';

import { MeteoComponent } from "../meteo/meteo.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { VilleComponent } from "../ville/ville.component";
import { CarteComponent } from '../carte/carte.component';


@Component({
  selector: 'app-home',
  imports: [FormulaireComponent, ReactiveFormsModule, MeteoComponent, HeaderComponent, FooterComponent,
  VilleComponent, CarteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  champ = new FormControl('');
}
