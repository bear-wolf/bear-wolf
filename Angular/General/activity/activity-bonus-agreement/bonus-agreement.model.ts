import { Activity } from '../activity.model';
import * as moment from 'moment';
import { Configuration } from '@shared/modules/outer-config/models/config';
import { Period } from '@shared/models/period.model';
import {DrugInformationGroup} from '../activity-shared/drug-information-group.model';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {BonusAgreementGroup} from './bonus-agreement-group';
import { EventEmitter } from '@angular/core';

export class BonusAgreement extends Activity {
  activityPoint: number;
  nds: number;
  secondaryDb: boolean;
  ntzAmount: number;
  calculationAmount: number;
  reportsAmount: number;
  factTotal: number;
  growthOrganic: number;
  investment: number;
  priceReport: number;
  periodFact: Period;
  drugInformationGroup: BonusAgreementGroup[] = [];
  ntzAmountPrice: number;
  calculationAmountPrice: number;
  reportsAmountPrice: number;
  factTotalPrice: number;
  estimatedInvestmentsForPeriodPrice: number;
  priceReportPrice: number;
  planTotal: number;
  investmentByMatrix: number;
  investmentMonth: number;
  directPosting: number;
  onEstimatedInvestmentsChange: EventEmitter<number> = new EventEmitter<number>();
  premiumSize: number;
  factInvestment: number;
  revers: number;
  premium: number;
  scale1: number;
  scale2: number;
  scale3: number;

  constructor(
      currencyService: CurrencyService,
      data: any
  ) {
    super(data, currencyService);

    data = data || {};

    this.activityPoint = data.activityPoint || 0;
    this.nds = data.nds || Configuration.ndsPercent || 20;
    this.secondaryDb = data.secondaryDb || false;
    this.ntzAmount = data.ntzAmount || 0;
    this.calculationAmount = data.calculationAmount || 0;
    this.reportsAmount = data.reportsAmount || 0;
    this.factTotal = data.factTotal || 0;
    this.growthOrganic = data.growthOrganic || 0;
    this.investment = data.investment || 0;
    this.factInvestment = data.factInvestment;
    this.priceReport = data.priceReport || 0;
    this.premiumSize = data.premiumSize || 0;
    this.periodFact = new Period(data.periodFromFact || new Date(), data.periodToFact || new Date());

    (data.drugInformationGroup || []).forEach((item) => {
      this.drugInformationGroup.push(new BonusAgreementGroup(this.currencyService, item));
    });

    if (!this.drugInformationGroup.length) {
      this.drugInformationGroup.push(new BonusAgreementGroup(this.currencyService, {}));
    }
    super.createCurrencyObject(this.nameOfCurrencyField, data);
    this.getCurrencyStore();
  }

  getCurrencyStore(data?: any) {
    const key = this.currencyService.currentCurrencyName;
    const name: string[] = this.nameOfCurrencyField;

    name.forEach((item: string) => {
      this[item] = this.store[item][key];
    });

    (this.drugInformationGroup || []).forEach((group) => {
      (group.drugInformation || []).forEach((item) => {
        item.getCurrencyStore();
      });
    });
  }

  set pushCurrencyStore(data: any) {
    const name = this.currencyService.currentCurrencyName;
    Object.keys(data).forEach((key, index) => {
      this.store[key] = this.store[key] || {};
      this.store[key][name] = data[key];
    });

    (this.drugInformationGroup || []).forEach((group) => {
      (group.drugInformation || []).forEach((item) => {
        item.pushCurrencyStore = item.prepareDataForStore();
      });
    });
  }

  get nameOfCurrencyField(): string[] {
    return [
      'ntzAmountPrice',
      'calculationAmountPrice',
      'reportsAmountPrice',
      'factTotalPrice',
      'estimatedInvestmentsForPeriodPrice',
      'priceReportPrice',
      'planTotal',
      'investmentByMatrix',
      'investmentMonth',
      'premium',
      'scale1',
      'scale2',
      'scale3',
      'fact',
      'directPosting',
      'revers'
    ];
  }

  get value() {
    const data: any = super.value;
    const fields: string[] = this.nameOfCurrencyField;

    data.activityPoint = Number(this.activityPoint);
    data.nds = Number(this.nds);
    data.secondaryDb = !!this.secondaryDb;
    data.ntzAmount =  Number(this.ntzAmount);
    data.calculationAmount =  Number(this.calculationAmount);
    data.reportsAmount =  Number(this.reportsAmount);
    data.factTotal =  Number(this.factTotal);
    data.growthOrganic =  Number(this.growthOrganic);
    data.investment =  Number(this.investment);
    data.priceReport = Number(this.priceReport);
    data.premiumSize = Number(this.premiumSize);
    data.factInvestment = Number(this.factInvestment || 0);
    data.periodFromFact = moment(this.periodFact.from).format(Configuration.format.server);
    data.periodToFact = moment(this.periodFact.to).format(Configuration.format.server);
    data.drugInformationGroup = [];

    this.drugInformationGroup.forEach((drugInfoGroup: BonusAgreementGroup) => {
      data.drugInformationGroup.push(drugInfoGroup.value);
    });

    fields.forEach((item: string) => {
      data[item] = this.getPropertyFromStore(item);
    });

    return data;
  }

  emitEstimatedInvestmentsChange(): void {
    this.onEstimatedInvestmentsChange.emit(this.estimatedInvestmentsForPeriodPrice);
  }
}
