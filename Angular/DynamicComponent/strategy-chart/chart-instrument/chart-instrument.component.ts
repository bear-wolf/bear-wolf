import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StrategyService} from '../../../_services';
import {StrategyType} from '../../../_models/strategy';

@Component({
  selector: 'app-chart-instrument',
  templateUrl: './chart-instrument.component.html'
})
export class ChartInstrumentComponent implements OnInit, AfterViewInit {
  status: boolean = false;
  context: any[];

  @ViewChild('pieChart')
  pieChart: ElementRef;

  @Input()
  data: StrategyType;

  constructor(
    public strategyService: StrategyService) {
  }

  ngOnInit() {
  }

  getData() {
    setTimeout(() => {
      if (this.context) {
        this.draw();
      } else {
        this.strategyService.getChart(this.data.ID)
          .subscribe((item: any) => {
            this.status = true;
            if (item.StrategySymbolStat.length) {
              this.context = [
                ['Task', 'Hours per Day']
              ];
              item.StrategySymbolStat.forEach((item: iStrategySymbolStat) => {
                this.context.push([item.Symbol, (item.Share * 100)]);
              });
              this.draw();
            }
          }, (error: any) => {
            this.status = true;
          });
      }
    }, 50);
  }


  private drawChart = () => {
    const data = google.visualization.arrayToDataTable(this.context);
    const options = {
      sliceVisibilityThreshold: 0.05
    };
    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  };

  draw() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - instrument');
    this.getData();
  }
}

interface iStrategySymbolStat {
  Symbol: string;
  Share: number;
}

