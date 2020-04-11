import {Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {StrategyType} from '../../_models/strategy';
import {ChartInstrumentComponent} from './chart-instrument/chart-instrument.component';
// import {ChartFractionComponent} from './chart-fraction/chart-fraction.component';
import * as Highcharts from 'highcharts';
import {ChartFractionComponent} from './chart-fraction/chart-fraction.component';
import {ComponentRef} from '@angular/core/src/linker/component_factory';

@Component({
  selector: 'app-strategy-chart',
  templateUrl: './strategy-chart.component.html',
  styleUrls: ['./strategy-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StrategyChartComponent implements OnInit {
  @Input()
  data: StrategyType;

  @ViewChild('instrument', {read: ViewContainerRef}) instrument;
  @ViewChild('fraction', {read: ViewContainerRef}) fraction;

  showPositions: boolean = true;
  activeNumberTab: number = 0;

  private cmpRefFactoryInstrument: ComponentRef<ChartInstrumentComponent>;
  private cpmRefFraction: ComponentRef<ChartFractionComponent>;

  constructor(
    public injector: Injector,
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    const cmpFactory = this.cfr.resolveComponentFactory(ChartInstrumentComponent);
    this.cmpRefFactoryInstrument = cmpFactory.create(this.injector);
    this.cmpRefFactoryInstrument.instance.data = this.data;
    this.instrument.insert(this.cmpRefFactoryInstrument.hostView);

    const cmpFraction = this.cfr.resolveComponentFactory(ChartFractionComponent);
    this.cpmRefFraction = cmpFraction.create(this.injector);
    this.cpmRefFraction.instance.data = this.data;
  }

  changeTab($event) {
    this.activeNumberTab = $event.index;

    if (this.activeNumberTab) {
      this.fraction.insert(this.cpmRefFraction.hostView);
    } else {
      this.cmpRefFactoryInstrument.instance.getData();
    }
  }
}
