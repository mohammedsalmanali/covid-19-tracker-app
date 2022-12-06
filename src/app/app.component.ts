import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedCountryService } from 'src/app/services/shared-country.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private _sharedService: SharedCountryService, private cdr: ChangeDetectorRef) {
    this._sharedService.dataSource.subscribe((data) => {
      this.data = data;
    });
  }

  public data;
  title = 'covid-tracker';
  public isDarkTheme = false;

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
  }

  storeThemeSelection = () => {
    localStorage.setItem('theme', this.isDarkTheme ? 'dark': 'light');
  }
}
