import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StrategyType} from '../../_models/strategy';
import {StrategyService} from '../../_services';

declare var google: any;

@Component({
  selector: 'app-strategy-chart',
  templateUrl: './strategy-chart.component.html',
  styleUrls: ['./strategy-chart.component.scss']
})
export class StrategyChartComponent implements OnInit{
  @Input() data: StrategyType;

  @ViewChild('pieChart') pieChart: ElementRef;

  context: any[];
  status: boolean;

  constructor(
    public strategyService: StrategyService
  ) { }

  ngOnInit() {
    this.status = false;

    this.getData();
  }

  drawChart = () => {
    const data = google.visualization.arrayToDataTable(this.context);

    const options = { };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }

  getData() {
    this.strategyService.getChart(this.data.ID)
      .subscribe((item: any) => {
        this.status = true;
        if (item.StrategySymbolStat.length) {
          this.context = [
            ['Task', 'Hours per Day']
          ];
          item.StrategySymbolStat.forEach((item: iStrategySymbolStat) => {
            this.context.push([item.Symbol , (item.Share * 100)]);
          });
          this.draw();
        }
      }, (error: any)=>{
        this.status = true;
      });
  }

  draw() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}


export interface iStrategySymbolStat{
  Symbol: string;
  Share: number;
}
