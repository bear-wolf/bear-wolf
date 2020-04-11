import {DmaSkuProjectEnum} from './dma-sku-project.enum';
import {DmaSkuInfoBlock} from './dma-sku-info-block.model';
import {DmaForecastTable} from './dma-forecast-table.model';
import {Sku} from '@shared/models/sku.model';
import {CommonInnerData} from '../activity-shared/common-inner-data.model';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {CurrencyEnum} from '@shared/enums/currency.enum';

export class DmaSkuBlock extends CommonInnerData {
    id: number;
    dmaId: number;
    dmaVersion: number;
    skuBlockName: string;
    skuId: number;
    dmaProject: DmaSkuProjectEnum;
    priceDDP: number;
    priceStartPrice: number;
    priceEndPrice: number;
    posmPosition: string;
    additionalAccommodation: string;
    additionalCreationTZ: number;
    additionalCalculationInTheCategory: number;
    pharmacistTraining: string;
    conditionsCommunication: boolean;
    isSimilarActionByCompetitors: boolean;
    whatDrug: string;
    baseDrugGain: number;
    lossesToReplaceCompetitors: number;
    forecastOfSalesWithoutSharesRubPrice: number;
    forecastOfSalesWithoutSharesUpPrice: number;
    skuInfoBlock: DmaSkuInfoBlock;
    forecastTable: DmaForecastTable;
    sku: Sku;

    constructor(
        currencyService: CurrencyService,
        data: any,
        private index: number
    ) {
        super();
        this.currencyService = currencyService;
        data = data || {};

        this.id = data.id || 0;
        this.dmaId = data.dmaId || null;
        this.dmaVersion = data.dmaVersion || null;
        this.skuBlockName = data.skuBlockName || null;
        this.skuId = data.skuId || 0;
        this.dmaProject = data.dmaProject || 0;
        this.priceDDP = data.priceDDP || 0;
        this.posmPosition = data.posmPosition || '';
        this.additionalAccommodation = data.additionalAccommodation || '';
        this.additionalCreationTZ = data.additionalCreationTZ || 0;
        this.additionalCalculationInTheCategory = data.additionalCalculationInTheCategory || 0;
        this.pharmacistTraining = data.pharmacistTraining || '';
        this.conditionsCommunication = data.conditionsCommunication || false;
        this.isSimilarActionByCompetitors = data.isSimilarActionByCompetitors || false;
        this.whatDrug = data.whatDrug || '';
        this.baseDrugGain = data.baseDrugGain || 0;
        this.lossesToReplaceCompetitors = data.lossesToReplaceCompetitors || 0;

        //TODO: НЕ ТАК!
        // if (data.skuInfoBlock) {
        //   data.skuInfoBlock.skuBlocksId = this.id;
        //   data.forecastTable.skuBlocksId = this.id;
        // }
        data.skuInfoBlock = data.skuInfoBlock || {};
        data.skuInfoBlock['skuBlocksId'] = this.id;
        this.skuInfoBlock = new DmaSkuInfoBlock(this.currencyService, data.skuInfoBlock);

        data.forecastTable = data.forecastTable || {};
        data.forecastTable['skuBlocksId'] = this.id;
        this.forecastTable = new DmaForecastTable(this.currencyService, data.forecastTable);
        this.sku = new Sku(data.sku);

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    get value(): object {
        const fields: string[] = this.nameOfCurrencyField;

        const data = {
            id: this.id,
            dmaId: this.dmaId,
            dmaVersion: Number(this.dmaVersion),
            skuBlockName: this.skuBlockName,
            dmaProject: Number(this.dmaProject),
            priceDDP: Number(this.priceDDP || 0),
            posmPosition: this.posmPosition,
            additionalAccommodation: this.additionalAccommodation,
            additionalCreationTZ: Number(this.additionalCreationTZ),
            additionalCalculationInTheCategory: Number(this.additionalCalculationInTheCategory),
            pharmacistTraining: this.pharmacistTraining,
            conditionsCommunication: !!this.conditionsCommunication,
            isSimilarActionByCompetitors: !!this.isSimilarActionByCompetitors,
            whatDrug: this.whatDrug,
            skuInfoBlock: this.skuInfoBlock && this.skuInfoBlock.value,
            forecastTable: this.forecastTable && this.forecastTable.value,
            skuId: this.sku.id
        };

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        return data;
    }

    set pushCurrencyStore(data: any) {
        const currency = CurrencyEnum[this.currencyService.currentCurrency];
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][currency] = data[key];
        });

        if (this.skuInfoBlock) {
            this.skuInfoBlock.pushCurrencyStore = this.skuInfoBlock.prepareDataForStore();
        }

        if (this.forecastTable) {
            this.forecastTable.pushCurrencyStore = this.forecastTable.prepareDataForStore();
        }
    }

  getCurrencyStore() {
    const key = this.currencyService.currentCurrencyName;
    const name: string[] = this.nameOfCurrencyField;

    name.forEach((item: string) => {
      this[item] = this.store[item][key];
    });

    if (this.skuInfoBlock) {
      this.skuInfoBlock.getCurrencyStore();
    }

    if (this.forecastTable) {
      this.forecastTable.getCurrencyStore();
    }
  }

    prepareDataForStore(): any {
        const data: any = {};
        const name = this.nameOfCurrencyField;

        for (let i = 0; i <= 3; i++) {
            name.forEach((item: string) => {
                data[item] = this[item];
            });
        }

        return data;
    }

    get nameOfCurrencyField(): string[] {
        return [
            'forecastOfSalesWithoutSharesRubPrice',
            'forecastOfSalesWithoutSharesUpPrice',
            'priceStartPrice',
            'priceEndPrice'
        ];
    }
}
