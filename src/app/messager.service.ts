import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagerService {

  constructor() { }

  private readonly sujetMessage = new Subject<string>();

  envoyerMessage(message : any) : void {
    this.sujetMessage.next(message);

  }

  recevoirMessage() : Observable<string>{

    return this.sujetMessage.asObservable();
  }
}
