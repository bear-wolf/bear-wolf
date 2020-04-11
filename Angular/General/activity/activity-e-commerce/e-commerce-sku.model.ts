import {Sku} from '@shared/models/sku.model';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {CommonInnerData} from '../activity-shared/common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class ECommerceSku extends CommonInnerData {
    id: number;
    eCommerceId: number;
    skuId: number;
    sku: Sku;
    salesForecast: number;
    salesDuringActionPlan: number;
    roiPlan: number;
    totalCostAbbottActionPlan: number;
    salesDuringActionFact: number;
    roiFact: number;
    totalCostAbbottActionFact: number;
    reverse: number;
    directPosting: number;

    constructor(
        currencyService: CurrencyService,
        data: any
    ) {
        super();

        this.currencyService = currencyService;

        this.id = data.id;
        this.eCommerceId = data.eCommerceId;
        this.skuId = data.skuId;
        this.sku = data.sku ? new Sku(data.sku) : null;
        this.salesForecast = Number(data.salesForecast || 0);
        this.salesDuringActionPlan = Number(data.salesDuringActionPlan || 0);
        this.totalCostAbbottActionPlan = Number(data.totalCostAbbottActionPlan || 0);
        this.salesDuringActionFact = Number(data.salesDuringActionFact || 0);
        this.roiPlan = Number(data.roiPlan || 0);
        this.roiFact = Number(data.roiFact || 0);
        this.reverse = Number(data.reverse || 0);
        this.totalCostAbbottActionFact = Number(data.totalCostAbbottActionFact || 0);
        this.directPosting = Number(data.directPosting || 0);

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

  get nameOfCurrencyField(): string[] {
    return [
      'salesDuringActionFact',
      'totalCostAbbottActionFact'
    ];
  }

}
