import { Component, OnInit, Input } from '@angular/core';
import { SharedCountryService } from 'src/app/services/shared-country.service';
import { OverAllData } from '../../models/overall-data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  overAllData:OverAllData;
  country = 'Global';
  @Input() public darkTheme;

  constructor(private _sharedService: SharedCountryService) {
    this._sharedService.dataSource.subscribe((data) => {
      this.overAllData = data;
      this.overAllData.lastUpdate = new Date(this.overAllData.lastUpdate).toDateString();
    });
  }

  ngOnInit(): void {
  }

}
