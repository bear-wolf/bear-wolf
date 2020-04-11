import { CommonInnerData } from '../activity-shared/common-inner-data.model';
import { CurrencyService } from '@shared/components/currency/currency.service';

export class DmaTotals extends CommonInnerData {
  salesGrowth: number;
  discountForBuyer: number;
  discountForBuyerCompensated: number;
  participationCostRubPrice: number;
  totalAbbottCostsPrice: number;
  investments: number;
  salesGrowthDuringPromotionPackagesPrice: number;
  salesGrowthDuringPromotionRubPrice: number;
  salesDuringPromotionPackages: number;
  salesDuringPromotionRubPrice: number;
  roi: number;
  brandId: number;
  skuId: number;
  id: number;
  dmaId: number;
  dmaVersion: number;


  constructor(
    currencyService: CurrencyService,
    data: any
  ) {
    super();
    this.currencyService = currencyService;
    this.createStoreData();

    data = data || {};

    this.salesGrowth = data.salesGrowth || 0;
    this.discountForBuyer = data.discountForBuyer || 0;
    this.discountForBuyerCompensated = data.discountForBuyerCompensated || 0;
    // this.participationCostRub = data.participationCostRub || 0;
    // this.totalAbbottCosts = data.totalAbbottCosts || 0;
    this.investments = data.investments || 0;
    // this.salesGrowthDuringPromotionPackages = data.salesGrowthDuringPromotionPackages || 0;
    // this.salesGrowthDuringPromotionRub = data.salesGrowthDuringPromotionRub || 0;
    this.salesDuringPromotionPackages = data.salesDuringPromotionPackages || 0;
    // this.salesDuringPromotionRub = data.salesDuringPromotionRub || 0;
    this.roi = data.roi || 0;
    this.brandId = data.brandId || 0;
    this.skuId = data.skuId || 0;
    this.id = data.id || null;
    this.dmaId = data.dmaId || null;
    this.dmaVersion = data.dmaVersion || 0;

    this.getCurrencyStore();
  }

  get value(): object {
    const fields: string[] = this.nameOfCurrencyField;

    const data: any = {
      salesGrowth: Number(this.salesGrowth),
      // participationCostRub: Number(this.participationCostRub),
      // totalAbbottCosts: Number(this.totalAbbottCosts),
      investments: Number(this.investments),
      // salesGrowthDuringPromotionPackages: Number(this.salesGrowthDuringPromotionPackages),
      // salesGrowthDuringPromotionRub: Number(this.salesGrowthDuringPromotionRub),
      salesDuringPromotionPackages: Number(this.salesDuringPromotionPackages),
      // salesDuringPromotionRub: Number(this.salesDuringPromotionRub),
      discountForBuyer: Number(this.discountForBuyer),
      discountForBuyerCompensated: Number(this.discountForBuyerCompensated),
      dmaId: this.dmaId,
      dmaVersion: this.dmaVersion
    };

    if (this.id) {
      data.id = Number(this.id);
    }

    fields.forEach((item: string) => {
      data[item] = this.getPropertyFromStore(item);
    });

    return data;
  }

  // getCurrencyStore() {
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

  get nameOfCurrencyField(): string[] {
    return [
      'participationCostRubPrice',
      'totalAbbottCostsPrice',
      'salesGrowthDuringPromotionPackagesPrice',
      'salesGrowthDuringPromotionRubPrice',
      'salesDuringPromotionRubPrice'
    ];
  }

  createStoreData() {
    super.createCurrencyObject(this.nameOfCurrencyField);
  }
}
