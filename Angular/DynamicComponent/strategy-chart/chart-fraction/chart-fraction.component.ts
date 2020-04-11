import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Strategy} from '../../../_services';
import * as Highcharts from 'highcharts';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {ChartOptionTest} from './chart-option.test.model';

const offset = Math.abs(new Date().getTimezoneOffset()) * 60000;

let that: ChartFractionComponent;

function getDayName(time: number) {
  const dayNumber: number = new Date(time).getDay();
  switch (dayNumber) {
    case 0:
      return 'Воскресенье';
    case 1:
      return 'Понедельник';
    case 2:
      return 'Вторник';
    case 3:
      return 'Среда';
    case 4:
      return 'Четверг';
    case 5:
      return 'Пятница';
    case 6:
      return 'Суббота';
  }
}

@Component({
  selector: 'app-chart-fraction',
  templateUrl: './chart-fraction.component.html'
})
export class ChartFractionComponent implements OnInit, OnDestroy, AfterViewInit {
  status: boolean = true;
  context: any[];

  @ViewChild('pieChart')
  pieChart: ElementRef;

  @Input()
  data: any;

  destroy$ = new Subject();

  // component data
  strategy: Strategy;
  chartOptions: any;

  // args: any;
  get isGraph(): boolean {
    return this.data.Chart.length;
  }

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    that = this;

    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart: {
        zoomType: 'x',
        backgroundColor: '#f8f8f8'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e<br>%b',
          month: '%y<br>%b'
        },
        gridLineWidth: 1,
        gridLineColor: '#eaeaea'
      },
      yAxis: {
        labels: {
          format: '{value}%'
        },
        title: {
          text: ''
        },
        gridLineWidth: 1,
        gridLineColor: '#eaeaea',
        startOfWeek: 1
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        useHTML: true,
        // formatter: function () {
        //   return `<div class="arearange-tooltip-header ${this.y < 0 ? 'negative' : ''} ${this.y > 0 ? 'positive' : ''}">` +
        //     `${Highcharts.numberFormat((this.y), 2, '.')}%</div>` +
        //     `<div>${Highcharts.dateFormat('%e %b %Y, %H:%M', this.x + offset)}</div>`;
        // }
      },
      type: 'arearange',
      series: [{
        type: 'area',
        lineWidth: 1,
        // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        data: this.getChartDataValues(this.data.Chart),
        zones: [{
          value: 0,
          color: '#ec151d',
          fillColor: 'rgba(236, 21, 29, .1)'
        }, {
          color: '#00a651',
          fillColor: 'rgba(0, 166, 81, .1'
        }]
      }]
    };
  }

  getChartDataValues(chartData: any[]) {
    const data: object[] = [];
    chartData.forEach(d => data.push([new Date(d.DT).getTime(), d.Yield]));
    return data;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    Highcharts.chart('container', this.chartOptions);
  }
}
