import {CurrencyService} from "@shared/components/currency/currency.service";
import {CommonInnerData} from "../activity-shared/common-inner-data.model";

export class DmaForecastTable extends CommonInnerData{
  salesGrowth: number;
  discountForBuyer: number;
  discountForBuyerСompensated: number;
  participationCostRub: number;
  totalAbbottCosts: number;
  investments: number;
  salesGrowthDuringPromotionPacckages: number;
  salesGrowthDuringPromotionRub: number;
  salesDuringPromotionPacckages: number;
  salesDuringPromotionRub: number;
  roi: number;
  id: number;
  skuBlocksId: number;
  participationCostRubPrice: number;
  totalAbbottCostsPrice: number;
  salesGrowthDuringPromotionPackagesPrice: number;
  salesGrowthDuringPromotionRubPrice: number;
  salesDuringPromotionRubPrice: number;
  roiPrice: number;

  constructor (
    currencyService: CurrencyService,
    data?: {[key: string]: number}
  ) {
    super();
    data = data || {};

    this.currencyService = currencyService;

    this.salesGrowth = data.salesGrowth || 0;
    this.discountForBuyer = data.discountForBuyer || 0;
    this.discountForBuyerСompensated = data.discountForBuyerСompensated || 0;
    this.participationCostRub = data.participationCostRub || 0;
    this.totalAbbottCosts = data.totalAbbottCosts || 0;
    this.investments = data.investments || 0;
    this.salesGrowthDuringPromotionPacckages = data.salesGrowthDuringPromotionPacckages || 0;
    this.salesGrowthDuringPromotionRub = data.salesGrowthDuringPromotionRub || 0;
    this.salesDuringPromotionPacckages = data.salesDuringPromotionPacckages || 0;
    this.salesDuringPromotionRub = data.salesDuringPromotionRub || 0;
    this.roi = data.roi || 0;
    this.id = data.id || null;
    this.skuBlocksId = data.skuBlocksId || null;

    super.createCurrencyObject(this.nameOfCurrencyField, data);
    this.getCurrencyStore();
  }

  get nameOfCurrencyField(): string[] {
    return [
      'participationCostRubPrice',
      'totalAbbottCostsPrice',
      'salesGrowthDuringPromotionPackagesPrice',
      'salesGrowthDuringPromotionRubPrice',
      'salesDuringPromotionRubPrice',
      'roiPrice'
    ];
  }

  get value(): any {
    const fields: string[] = this.nameOfCurrencyField;

    const data: any = {
      salesGrowth: Number(this.salesGrowth),
      discountForBuyer: Number(this.discountForBuyer),
      discountForBuyerСompensated: Number(this.discountForBuyerСompensated),
      participationCostRub: Number(this.participationCostRub),
      totalAbbottCosts: Number(this.totalAbbottCosts),
      investments: Number(this.investments),
      salesGrowthDuringPromotionPacckages: Number(this.salesGrowthDuringPromotionPacckages),
      salesGrowthDuringPromotionRub: Number(this.salesGrowthDuringPromotionRub),
      salesDuringPromotionPacckages: Number(this.salesDuringPromotionPacckages),
      salesDuringPromotionRub: Number(this.salesDuringPromotionRub),
      roi: Number(this.roi),
      id: Number(this.id),
      skuBlocksId: Number(this.skuBlocksId)
    };

    fields.forEach((item: string) => {
      data[item] = this.getPropertyFromStore(item);
    });

    return data;
  }
}
