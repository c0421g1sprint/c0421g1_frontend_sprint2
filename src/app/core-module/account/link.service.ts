import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private behaviorSubject = new Subject();


  reloadComponent() {
    this.behaviorSubject.next();
  }

  reloadLogoutComponent(){
    this.behaviorSubject.error("error");
  }

  getReloadComponent(){
    return this.behaviorSubject.asObservable();
  }


  constructor() { }
}
