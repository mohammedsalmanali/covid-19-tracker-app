import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CovidTrackerService } from 'src/app/covid-tracker.service';
import { OverAllData } from 'src/app/models/overall-data';
import { SharedCountryService } from '../../services/shared-country.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {

  chartType = 'line';
  dailyConfirmed = [];
  dailyDeaths = [];
  dailyReportedDate = [];
  dataSource: OverAllData;
  confirmedValue;
  recoveredValue;
  deathValue;
  lastUpdateValue;
  selectedCountry: string = '';
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  lineChartLegend;
  lineChartType;
  lineChartPlugins;
  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType;
  barChartLegend;
  barChartPlugins;
  barChartData: ChartDataSets[];
  lineChartReady;
  barChartReady;

  constructor(private data: CovidTrackerService, private _sharedService: SharedCountryService) {
    this._sharedService.countrySource.subscribe(async(country: string) => {
      if(country) {
        this.selectedCountry = country;
        if(this.selectedCountry !== 'Global') {
          this.chartType = 'bar';
          this.barChartReady = false;
          await this.getData();
        }
        else {
          this.chartType = 'line';
          this.lineChartReady = false;
          await this.getDailyData();
        }
      }
  });
  }

  assignDailyData = (daily) => {
    this.dailyConfirmed.push(daily.confirmed.total);
    this.dailyDeaths.push(daily.deaths.total);
    this.dailyReportedDate.push(daily.reportDate);
  }

  getDailyData = async() => {
    this.data.fetchDailyData().subscribe(async(res) => {
      this.dailyConfirmed.length=0;
      this.dailyDeaths.length=0;
      this.dailyReportedDate.length=0;
      res.map(async(daily) => {
        await this.assignDailyData(daily);
      });
      await this.lineChart();
    });
  }

  getData = () => {
    this.data.fetchData(this.selectedCountry).subscribe(async(res) => {
      this.confirmedValue = res.confirmed.value;
      this.recoveredValue = res.recovered.value;
      this.deathValue = res.deaths.value;
      this.lastUpdateValue = res.lastUpdate;
      this.dataSource = {
        confirmed:{
          value: res.confirmed.value
        }, 
        recovered:{
          value: res.recovered.value
        }, 
        deaths:{
          value: res.deaths.value
        }, 
        lastUpdate:res.lastUpdate
      }
      this._sharedService.dataSource.next(this.dataSource);
      await this.barChart();
    })
  }

  lineChart = async() => {
      this.lineChartData = 
      [
        { data: this.dailyConfirmed, label: 'Confirmed' },
        { data: this.dailyDeaths, label: 'Deaths' }
      ];
      this.lineChartLabels= this.dailyReportedDate;
      this.lineChartOptions = {
        responsive: true,
      };
      this.lineChartColors = [
        {
          borderColor: '#3333ff',
          backgroundColor: 'rgba(0,0,255,0.5)',
        },
        {
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ];
      this.lineChartLegend = true;
      this.lineChartType = 'line';
      this.lineChartPlugins = [];
      this.lineChartReady = true;
      await this.getData();
    
  }

  barChart = () => {
    this.barChartOptions = {
      responsive: true,
    };
    this.barChartLabels = ['Infected','Recovered','Deaths'];
    this.barChartType = 'bar';
    this.barChartLegend = false;
    this.barChartPlugins = [];
  
    this.barChartData = [
      { 
        data: [ this.confirmedValue, this.recoveredValue, this.deathValue],
        label: 'Count',
        backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
        borderColor: ['blue', 'green', 'red']
      }
    ]
    this.barChartReady = true;
  }

  ngOnInit(): void {
  }

}
