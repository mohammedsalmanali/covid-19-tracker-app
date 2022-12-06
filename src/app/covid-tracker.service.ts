import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { OverAllData } from './models/overall-data';
import { DailyData } from './models/daily-data';
import { CountryList } from './models/countryList';

@Injectable({
  providedIn: 'root'
})

export class CovidTrackerService {

  url = 'https://covid19.mathdro.id/api';

  constructor(private httpClient: HttpClient) { }

  fetchDailyData = () => {

    try{
      return this.httpClient.get<DailyData[]>(`${this.url}/daily`);
    } catch(error) {
      console.log(error);
    }

  }

  fetchData = (country) =>{

    let changeableUrl = this.url;

    if(country!='Global'){
      changeableUrl = `${this.url}/countries/${country}`;
    }

    try {
      return this.httpClient.get<OverAllData>(changeableUrl);
    } catch (error) {
      console.log(error);
    }

  }

  fetchCountries = () => {

    try {
      return this.httpClient.get<CountryList>(`${this.url}/countries`);
    } catch (error) {
      console.log(error);
    }
  }
}
