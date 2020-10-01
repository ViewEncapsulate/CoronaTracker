import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  caseType = '';
  globalData: GlobalDataSummary[];
  datatable = [];
  loading = true;
  chart = {
    PieChart : 'PieChart' ,
    ColumnChart : 'ColumnChart' ,
    LineChart : 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    },
  };

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next: (results) => {
          this.globalData = results;
          results.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalRecovered += cs.recovered;
              this.totalDeaths += cs.deaths;
            }
          });

          this.initChart('c');
        },
        complete : ()=>{
          this.loading = false;
        }
      }
    );
  }

  initChart(caseType: string): void
  {
    this.datatable = [];
    this.globalData.forEach(cs => {
      let value: number;
      switch (caseType) {
        case 'a':
          if (cs.active > 20000) {
            value = cs.active;
          }
          break;
        case 'd':
          if (cs.deaths > 20000) {
            value = cs.deaths;
          }
          break;
        case 'r':
          if (cs.recovered > 20000) {
            value = cs.recovered;
          }
          break;
        case 'c':
          if (cs.confirmed > 20000) {
            value = cs.confirmed;
          }
          break;
      }

      if (value) {
        this.datatable.push([cs.country, value]);
      }
    });
    console.log(this.datatable);
  }

  updateChart(input): void {
    this.initChart(input);
  }

}
