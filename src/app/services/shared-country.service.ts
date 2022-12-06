import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverAllData } from '../models/overall-data';

@Injectable({
  providedIn: 'root'
})
export class SharedCountryService {

  countrySource: BehaviorSubject<string> = new BehaviorSubject('');

  initialData = {
    confirmed:{
      value: 0
    }, 
    recovered:{
      value: 0
    }, 
    deaths:{
      value: 0
    }, 
    lastUpdate:''
  }
  dataSource: BehaviorSubject<OverAllData> = new BehaviorSubject(this.initialData);

  constructor() { }
}
