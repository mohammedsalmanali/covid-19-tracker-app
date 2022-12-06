import { Component, OnInit, Input } from '@angular/core';
import { CovidTrackerService } from 'src/app/covid-tracker.service';
import { SharedCountryService } from '../../services/shared-country.service';

interface CountryView {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})

export class CountryPickerComponent implements OnInit {

  selectedCountry: string = 'Global';
  countryView: CountryView[] = [];
  public overAllData;
  @Input() public darkTheme;

  constructor(private data: CovidTrackerService, private _sharedService: SharedCountryService) {
    this._sharedService.dataSource.subscribe((data) => {
      this.overAllData = data;
    });
  }

  sendMessage(selectedCountry): void {
    this._sharedService.countrySource.next(selectedCountry);
  }

  getCountries = () => {
    this.countryView.push({
      value: 'Global',
      viewValue: 'Global'
    });
    this.data.fetchCountries().subscribe(res => {
      res.countries.map((country) => {this.countryView.push({
        value: country.name,
        viewValue: country.name
      })});
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.sendMessage(this.selectedCountry);
  }

}
