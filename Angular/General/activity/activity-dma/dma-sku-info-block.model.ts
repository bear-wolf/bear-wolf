import { CommonInnerData } from '../activity-shared/common-inner-data.model';
import { CurrencyService } from '@shared/components/currency/currency.service';

export class DmaSkuInfoBlock extends CommonInnerData {
  prPharmacistTrainingPrice: number;
  prExternalSurfacesPrice: number;
  prIndoorSurfacesPrice: number;
  prRadioPrice: number;
  prTvPrice: number;
  prOtherPrice: number;
  pcPharmacistTrainingPrice: number;
  pcExternalSurfacesPrice: number;
  pcIndoorSurfacesPrice: number;
  pcRadioPrice: number;
  pcTvPrice: number;
  pcOtherPrice: number;
  id: number;
  skuBlocksId: number;

  constructor(
    currencyService: CurrencyService,
    data: any
  ) {
    super();
    this.currencyService = currencyService;
    data = data || {};
    this.id = data.id || 0;
    this.skuBlocksId = data.skuBlocksId || 0;

    super.createCurrencyObject(this.nameOfCurrencyField, data);
    this.getCurrencyStore();
  }

  get value(): any {
    const fields: string[] = this.nameOfCurrencyField;
    // TODO: check it on type
    const data: any = {
      id: Number(this.id || 0),
      skuBlocksId: Number(this.skuBlocksId || 0)
    };

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
  //   name.forEach((item: string) => {
  //     this[item] = this.store[item][key];
  //   });
  // }

  get nameOfCurrencyField(): string[] {
    return [
      'prPharmacistTrainingPrice',
      'prExternalSurfacesPrice',
      'prIndoorSurfacesPrice',
      'prRadioPrice',
      'prTvPrice',
      'prOtherPrice',
      'pcPharmacistTrainingPrice',
      'pcExternalSurfacesPrice',
      'pcIndoorSurfacesPrice',
      'pcRadioPrice',
      'pcTvPrice',
      'pcOtherPrice',
      'idPrice',
      'skuBlocksIdPrice'
    ];
  }

  createStoreData() {
    super.createCurrencyObject(this.nameOfCurrencyField);
  }
}
