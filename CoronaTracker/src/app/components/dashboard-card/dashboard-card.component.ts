import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() totalConfirmed: number;
  @Input() totalRecovered: number;
  @Input() totalActive: number;
  @Input() totalDeaths: number;

  constructor() { }

  ngOnInit(): void {
  }

}
