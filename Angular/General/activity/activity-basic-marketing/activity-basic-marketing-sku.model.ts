import { Sku } from '@shared/models/sku.model';
import {CommonInnerData} from '../activity-shared/common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class BasicMarketingSku extends CommonInnerData{
  id: number;
  basicMarketingId: number;
  skuId: number;
  ntzOriginal: number;
  ntzCurrent: number;
  calculationOriginal: number;
  calculationCurrent: number;
  reportsOriginal: number;
  reportsCurrent: number;
  ntzEqualsOne: number;
  ntzMoreOnePacks: number;
  ntzMoreOneDots: number;
  ntzMoreOneTotal: number;
  facetingNumber: number;
  calculationNumber: number;
  calculationPlace: number;
  delta: number;
  sku: Sku;
  currentAmount: number;
  skuAmount: number;
  originalAmount: number;
  ntzAmount: number;
  calculationAmount: number;
  reportsAmount: number;
  deviationFactFromPlanNTZ: number;
  deviationFactFromPlanCalculation: number;
  hasReports: boolean;
  finesTotal: number;
  skuTotal: number;
  ntzOriginalPrice: number;
  ntzCurrentPrice: number;
  calculationOriginalPrice: number;
  calculationCurrentPrice: number;
  reportsOriginalPrice: number;
  reportsCurrentPrice: number;

  constructor(
    currencyService: CurrencyService,
    data: any
  ) {
    super();

    this.currencyService = currencyService;
    data = data || {};
    this.id = data.id;

    this.basicMarketingId = data.basicMarketingId;
    this.skuId = data.sku ? data.sku.id : null;
    this.ntzOriginal = data.ntzOriginal || 0;
    this.ntzCurrent = data.ntzCurrent || 0;
    this.calculationOriginal = data.calculationOriginal || 0;
    this.calculationCurrent = data.calculationCurrent || 0;
    this.reportsOriginal = data.reportsOriginal || 0;
    this.reportsCurrent = data.reportsCurrent || 0;
    this.ntzEqualsOne = data.ntzEqualsOne || 0;
    this.ntzMoreOnePacks = data.ntzMoreOnePacks || 0;
    this.ntzMoreOneDots = data.ntzMoreOneDots || 0;
    this.ntzMoreOneTotal = data.ntzMoreOneTotal || 0;
    this.facetingNumber = data.facetingNumber || 0;
    this.calculationNumber = data.calculationNumber || 0;
    this.calculationPlace = data.calculationPlace || 0;
    this.sku = data.sku ? new Sku(data.sku) : null;
    this.delta = data.delta || 0;
    this.currentAmount = data.currentAmount || 0;
    this.skuAmount = data.skuAmount || 0;
    this.originalAmount = data.originalAmount || 0;
    this.ntzAmount = data.ntzAmount || 0;
    this.calculationAmount = data.calculationAmount || 0;
    this.reportsAmount = data.reportsAmount || 0;
    this.deviationFactFromPlanNTZ = data.deviationFactFromPlanNTZ || 0;
    this.deviationFactFromPlanCalculation = data.deviationFactFromPlanCalculation || 0;
    this.hasReports = data.hasReports || false;
    this.finesTotal = data.finesTotal || 0;
    this.skuTotal = data.skuTotal || 0;

    super.createCurrencyObject(this.nameOfCurrencyField, data);
    this.getCurrencyStore();
  }

  get totalTest(): number {
    return this.calculationOriginal + this.ntzOriginal + this.reportsOriginal;
  }

  get nameOfCurrencyField(): string[] {
    return [
      'ntzOriginalPrice',
      'ntzCurrentPrice',
      'calculationOriginalPrice',
      'calculationCurrentPrice',
      'reportsOriginalPrice',
      'reportsCurrentPrice'
    ];
  }

  // getCurrencyStore() {
  //   console.log('getCurrencyStore');
  //   if (!this.currencyService) {
  //     throw new DOMException('There is not "currency service"');
  //   }
  //
  //   const key = this.currencyService.currentCurrencyName;
  //   const name: string[] = this.nameOfCurrencyField;
  //
  //   const store = this.currencyService.storeService.store;
  //   name.forEach((item: string) => {
  //     this[item] = store[item][key];
  //   });
  // }

  get value(): any {
    const fields: string[] = this.nameOfCurrencyField;
    const data: any = {
      basicMarketingId: this.basicMarketingId,
      skuId: this.skuId,
      ntzEqualsOne: Number(this.ntzEqualsOne || 0),
      ntzMoreOnePacks: Number(this.ntzMoreOnePacks || 0),
      ntzMoreOneDots: Number(this.ntzMoreOneDots || 0),
      ntzMoreOneTotal: Number(this.ntzMoreOneTotal || 0),
      facetingNumber: Number(this.facetingNumber || 0),
      calculationNumber: Number(this.calculationNumber || 0),
      calculationPlace: Number(this.calculationPlace || 0)
    };

    if (this.id) {
      data.id = this.id;
    }

    fields.forEach((item: string) => {
      data[item] = this.getPropertyFromStore(item);
    });

    return data;
  }
}
