import {Activity} from '../activity.model';
import {DmaTotals} from './dma-totals.model';
import {DmaSkuBlock} from './dma-sku-block.model';
import {DmaMethodologyEnum} from './activity-dma-methodology/dma-methodology.enum';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {CurrencyEnum} from '@shared/enums/currency.enum';

export class Dma extends Activity {
    budgetDuration: string;
    pointsInActivity: number;
    cities: string;
    useNds: boolean;
    identicalForAllBrandsoperty: boolean;
    sameForAllSkusWithinBrand: boolean;
    units: any;
    brandId: number;
    deductionFromDC: boolean;
    networkExposesPharmacyPlan: boolean;
    productManagerFullName: string;
    skuBlocks: DmaSkuBlock[];
    dmaTotals: DmaTotals;
    calculatingMethodologySalesExcludingDMActivities: DmaMethodologyEnum;
    prPharmacistTrainingPrice: number;
    prExternalSurfacesPrice: number;
    prIndoorSurfacesPrice: number;
    prRadioPrice: number;
    prTvPrice: number;
    prOtherPrice: number;
    prTotalPrice: number;
    pсPharmacistTrainingPrice: number;
    pсExternalSurfacesPrice: number;
    pсIndoorSurfacesPrice: number;
    pсRadioPrice: number;
    pсTvPrice: number;
    pсOtherPrice: number;
    pcTotalPrice: number;
    roIadditional: number;

    participationCostRubPrice: number;
    totalAbbottCostsPrice: number;
    salesGrowthDuringPromotionPackagesPrice: number;
    salesGrowthDuringPromotionRubPrice: number;
    salesDuringPromotionPackagesPrice: number;
    salesDuringPromotionRubPrice: number;
    roiPrice: number;
    version: number;

    constructor(
        currencyService: CurrencyService,
        data: any
    ) {
        super(data, currencyService);

        data = data || {};

        this.budgetDuration = data.budgetDuration || 1;
        this.pointsInActivity = data.pointsInActivity || 0;
        this.cities = data.cities || '';
        this.useNds = data.useNds || false;
        this.identicalForAllBrandsoperty = data.identicalForAllBrandsoperty || false;
        this.sameForAllSkusWithinBrand = data.sameForAllSkusWithinBrand || false;
        this.units = data.units || 0;
        this.brandId = data.brandId || null;
        this.deductionFromDC = data.deductionFromDC || false;
        this.networkExposesPharmacyPlan = data.networkExposesPharmacyPlan || false;
        this.productManagerFullName = data.productManagerFullName || '';
        this.version = data.version || 1;
        if (data.dmaTotals) {
            data.dmaTotals.dmaId = this.id;
        }
        if (data.dmaTotals) {
            data.dmaTotals.dmaVersion = this.version;
        }
        this.dmaTotals = new DmaTotals(this.currencyService, data.dmaTotals);
        this.calculatingMethodologySalesExcludingDMActivities = data.calculatingMethodologySalesExcludingDMActivities || DmaMethodologyEnum.BASE_LINE_FOR_STABLE;
        this.addToJointAgreement = data.addToJointAgreement || false;

        this.skuBlocks = [];
        if (data && data.skuBlocks && data.skuBlocks.length) {
            data.skuBlocks.forEach((skuBlock: object, index: number) => {
                skuBlock['dmaId'] = this.id;
                skuBlock['dmaVersion'] = this.version;
                //TODO: error in store
                this.skuBlocks.push(new DmaSkuBlock(currencyService, skuBlock, index));
            });
        }

        if (!this.skuBlocks.length) {
            this.skuBlocks.push(new DmaSkuBlock(currencyService, {}, 0));
        }

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    set pushCurrencyStore(data: any) {
        const currency = CurrencyEnum[this.currencyService.currentCurrency];
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][currency] = data[key];
        });

        (this.skuBlocks || []).forEach((item) => {
            item.pushCurrencyStore = item.prepareDataForStore();
        });

        if (this.dmaTotals) {
            this.dmaTotals.pushCurrencyStore = this.dmaTotals.prepareDataForStore();
        }
    }

    getCurrencyStore(data?: any) {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });

        (this.skuBlocks || []).forEach((item) => {
            item.getCurrencyStore();
        });

        if (this.dmaTotals) {
            this.dmaTotals.getCurrencyStore();
        }
    }

    createCurrencyObject(name: string[]) {
        this.currencyService.storeService.store = this;
    }

    get nameOfCurrencyField(): string[] {
        return [
            'prPharmacistTrainingPrice',
            'prExternalSurfacesPrice',
            'prIndoorSurfacesPrice',
            'prRadioPrice',
            'prTvPrice',
            'prOtherPrice',
            'prTotalPrice',
            'pсPharmacistTrainingPrice',
            'pсExternalSurfacesPrice',
            'pсIndoorSurfacesPrice',
            'pсRadioPrice',
            'pсTvPrice',
            'pсOtherPrice',
            'pcTotalPrice',
            'roIadditional',
            'participationCostRubPrice',
            'totalAbbottCostsPrice',
            'salesGrowthDuringPromotionPackagesPrice',
            'salesGrowthDuringPromotionRubPrice',
            'salesDuringPromotionPackagesPrice',
            'salesDuringPromotionRubPrice',
            'roiPrice',
        ];
    }

    prepareDataForStore(): any {
        const data = super.prepareDataForStore(); // root level

        (this.skuBlocks || []).forEach((item) => {
            const array: any = item.prepareDataForStore();
            Object.keys(array).forEach((_item) => {
                data[_item] = array[_item];
            });
        });
        return data;
    }

    get value() {
        const data: any = super.value;
        const fields: string[] = this.nameOfCurrencyField;

        data.budgetDuration = Number(this.budgetDuration);
        data.pointsInActivity = Number(this.pointsInActivity);
        data.cities = this.cities;
        data.useNds = !!this.useNds;
        data.identicalForAllBrandsoperty = !!this.identicalForAllBrandsoperty;
        data.sameForAllSkusWithinBrand = !!this.sameForAllSkusWithinBrand;
        data.units = this.units;
        data.brandId = Number(this.brandId);
        data.deductionFromDC = !!this.deductionFromDC;
        data.networkExposesPharmacyPlan = !!this.networkExposesPharmacyPlan;
        data.productManagerFullName = this.productManagerFullName;
        data.calculatingMethodologySalesExcludingDMActivities = Number(this.calculatingMethodologySalesExcludingDMActivities);
        data.dmaTotals = this.dmaTotals.value;

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        data.skuBlocks = [];
        (this.skuBlocks || []).forEach((skuBlock: DmaSkuBlock) => {
            data.skuBlocks.push(skuBlock.value);
        });

        return data;
    }
}
