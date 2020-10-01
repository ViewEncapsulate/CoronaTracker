import { Component, OnInit } from '@angular/core';
import { DateWiseData } from 'src/app/models/date-wise';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  data: GlobalDataSummary[];
  dataTable = [];
  countries: string[] = [];
  dateWiseData;
  loading = true;
  options: {
    height : 500,
    animation:{
      duration: 1000,
      easing: 'out',
    },
  }
  selectedCountryData: DateWiseData[];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    // this.dataService.getGlobalData().subscribe(
    //   {
    //     next: (results) => {
    //       this.data = results;
    //       this.data.forEach(cs => {
    //         this.countries.push(cs.country);
    //       });
    //     }
    //   });

    // this.dataService.getDateWiseData().subscribe((results) => {
    //   this.dateWiseData = results;
    // });
    merge(
      this.dataService.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ),
      this.dataService.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('India')
         this.loading = false;
        }
      }
    )
  }

  /**
   * updateValues() is used to update values according to country selected
   * @param country - Country selected from drop down.
   */
  updateValues(country: string): void
  {
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();
  }

  updateChart(){
    this.dataTable = [];
    this.selectedCountryData.forEach(cs => {
      this.dataTable.push([cs.date , cs.cases]);
    });
  }
}
