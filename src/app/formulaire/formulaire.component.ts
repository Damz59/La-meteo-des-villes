import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import { MessagerService } from '../messager.service';

@Component({
  selector: 'app-formulaire',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {
  champ = new FormControl('');

  constructor(private readonly messager : MessagerService){}

  recupererValeur(){

    this.messager.envoyerMessage(this.champ.value);
    this.champ.reset();
  }

}
