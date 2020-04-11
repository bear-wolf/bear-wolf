import {Activity} from '../activity.model';
import * as moment from 'moment';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {ECommerceSku} from './e-commerce-sku.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class ECommerce extends Activity {
    activityMonthFrom: Date;
    duration: number;
    durationForBudget: number;
    brandId: number;

    placingBanner: boolean;
    placingBannerInvestmentPlanPrice: number;
    placingBannerInvestmentFactPrice: number;
    placingBannerPlanPrice: number;
    placingBannerFactPrice: number;

    firstLinkSearchOptimizationService: boolean;
    firstLinkSearchOptimizationServicePlanPrice: number;
    firstLinkSearchOptimizationServiceFactPrice: number;
    firstLinkSearchOptimizationServiceInvestmentPlanPrice: number;
    firstLinkSearchOptimizationServiceInvestmentFactPrice: number;

    actionWithGoodsSearchOptimizationService: boolean;
    actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice: number;
    actionWithGoodsSearchOptimizationServiceInvestmentFactPrice: number;
    actionWithGoodsSearchOptimizationServicePlanPrice: number;
    actionWithGoodsSearchOptimizationServiceFactPrice: number;

    searchingForINNSearchOptimizationService: boolean;
    searchingForINNSearchOptimizationServicePlanPrice: number;
    searchingForINNSearchOptimizationServiceFactPrice: number;
    searchingForINNSearchOptimizationServiceInvestmentPlanPrice: number;
    searchingForINNSearchOptimizationServiceInvestmentFactPrice: number;

    promotionalArticlesConsumerAwareness: boolean;
    promotionalArticlesConsumerAwarenessInvestmentPlanPrice: number;
    promotionalArticlesConsumerAwarenessInvestmentFactPrice: number;
    promotionalArticlesConsumerAwarenessPlanPrice: number;
    promotionalArticlesConsumerAwarenessFactPrice: number;

    recommendedRelatedProductsConsumerAwareness: boolean;
    recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice: number;
    recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice: number;
    recommendedRelatedProductsConsumerAwarenessPlanPrice: number;
    recommendedRelatedProductsConsumerAwarenessFactPrice: number;

    targetMailing: boolean;
    targetMailingInvestmentPlanPrice: number;
    targetMailingInvestmentFactPrice: number;
    targetMailingPlanPrice: number;
    targetMailingFactPrice: number;

    massMailing: boolean;
    massMailingInvestmentPlanPrice: number;
    massMailingInvestmentFactPrice: number;
    massMailingPlanPrice: number;
    massMailingFactPrice: number;

    richContentPosting: boolean;
    richContentPostingInvestmentPlanPrice: number;
    richContentPostingInvestmentFactPrice: number;
    richContentPostingPlanPrice: number;
    richContentPostingFactPrice: number;

    participationMetaCategories: boolean;
    participationMetaCategoriesInvestmentPlanPrice: number;
    participationMetaCategoriesInvestmentFactPrice: number;
    participationMetaCategoriesPlanPrice: number;
    participationMetaCategoriesFactPrice: number;

    promotionalCodeProduct: boolean;
    promotionalCodeProductInvestmentPlanPrice: number;
    promotionalCodeProductInvestmentFactPrice: number;
    promotionalCodeProductPlanPrice: number;
    promotionalCodeProductFactPrice: number;

    investmentsPlanPrice: number;
    investmentsFactPrice: number;
    salesIncreasePlanPrice: number;
    salesIncreaseFactPrice: number;
    roiContractPlanPrice: number;
    roiContractFactPrice: number;
    directPostingPrice: number;
    reversePrice: number;

    eCommerceSkus: ECommerceSku[] = [];
    eCommerceSkuId: number;
    investmentsPlan: number;
    investmentsFact: number;
    salesIncreasePlan: number;
    salesIncreaseFact: number;
    roiContractPlan: number;
    roiContractFact: number;
    directPosting: number;
    reverse: number;

    constructor(currencyService: CurrencyService, data) {
        super(data, currencyService);

        this.placingBanner = data.placingBanner || false;
        this.activityMonthFrom = new Date(data.activityMonthFrom || Date());
        this.duration = Number(data.duration || 0);
        this.durationForBudget = Number(data.durationForBudget || 0);
        this.brandId = data.brandId;
        this.firstLinkSearchOptimizationService = data.firstLinkSearchOptimizationService || false;
        this.actionWithGoodsSearchOptimizationService = data.actionWithGoodsSearchOptimizationService || false;
        this.searchingForINNSearchOptimizationService = data.searchingForINNSearchOptimizationService || false;
        this.promotionalArticlesConsumerAwareness = data.promotionalArticlesConsumerAwareness || false;
        this.recommendedRelatedProductsConsumerAwareness = data.recommendedRelatedProductsConsumerAwareness || false;
        this.targetMailing = data.targetMailing || false;
        this.massMailing = data.massMailing || false;
        this.richContentPosting = data.richContentPosting || false;
        this.participationMetaCategories = data.participationMetaCategories || false;
        this.promotionalCodeProduct = data.promotionalCodeProduct || false;

        data.eCommerceSkus = (this.brandId) ? data.eCommerceSkus :  [];
        (data.eCommerceSkus || []).forEach((item: ECommerceSku) => {
            if (item.sku && item.skuId) {
                this.eCommerceSkus.push(new ECommerceSku(currencyService, item));
            }
        });
        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    get nameOfCurrencyField(): string[] {
        return [
            'placingBannerPlanPrice',
            'placingBannerInvestmentPlanPrice',
            'placingBannerInvestmentFactPrice',
            'placingBannerPlanPrice',
            'placingBannerFactPrice',
            'firstLinkSearchOptimizationServicePlanPrice',
            'firstLinkSearchOptimizationServiceFactPrice',
            'firstLinkSearchOptimizationServiceInvestmentPlanPrice',
            'firstLinkSearchOptimizationServiceInvestmentFactPrice',
            'actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice',
            'actionWithGoodsSearchOptimizationServiceInvestmentFactPrice',
            'actionWithGoodsSearchOptimizationServicePlanPrice',
            'actionWithGoodsSearchOptimizationServiceFactPrice',
            'searchingForINNSearchOptimizationServicePlanPrice',
            'searchingForINNSearchOptimizationServiceFactPrice',
            'searchingForINNSearchOptimizationServiceInvestmentPlanPrice',
            'searchingForINNSearchOptimizationServiceInvestmentFactPrice',
            'promotionalArticlesConsumerAwarenessInvestmentPlanPrice',
            'promotionalArticlesConsumerAwarenessInvestmentFactPrice',
            'promotionalArticlesConsumerAwarenessPlanPrice',
            'promotionalArticlesConsumerAwarenessFactPrice',
            'recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice',
            'recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice',
            'recommendedRelatedProductsConsumerAwarenessPlanPrice',
            'recommendedRelatedProductsConsumerAwarenessFactPrice',
            'targetMailingInvestmentPlanPrice',
            'targetMailingInvestmentFactPrice',
            'targetMailingPlanPrice',
            'targetMailingFactPrice',
            'massMailingInvestmentPlanPrice',
            'massMailingInvestmentFactPrice',
            'massMailingPlanPrice',
            'massMailingFactPrice',
            'richContentPostingInvestmentPlanPrice',
            'richContentPostingInvestmentFactPrice',
            'richContentPostingPlanPrice',
            'richContentPostingFactPrice',
            'participationMetaCategoriesInvestmentPlanPrice',
            'participationMetaCategoriesInvestmentFactPrice',
            'participationMetaCategoriesPlanPrice',
            'participationMetaCategoriesFactPrice',
            'promotionalCodeProductInvestmentPlanPrice',
            'promotionalCodeProductInvestmentFactPrice',
            'promotionalCodeProductPlanPrice',
            'promotionalCodeProductFactPrice',
            'investmentsPlanPrice',
            'investmentsFactPrice',
            'salesIncreasePlanPrice',
            'salesIncreaseFactPrice',
            'roiContractPlanPrice',
            'roiContractFactPrice',
            'directPostingPrice',
            'reversePrice'
        ];
    }

    prepareDataForStore(): any {
        const data = super.prepareDataForStore();

        (this.eCommerceSkus || []).forEach((item) => {
            const array: any = item.prepareDataForStore();
            Object.keys(array).forEach((_item) => {
                data[_item] = array[_item];
            });
        });
        return data;
    }

    getCurrencyStore(data?: any) {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });

        (this.eCommerceSkus || []).forEach((item) => {
            item.getCurrencyStore();
        });
    }

    set pushCurrencyStore(data: any) {
        const name = this.currencyService.currentCurrencyName;
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][name] = data[key];
        });

        (this.eCommerceSkus || []).forEach((item) => {
            item.pushCurrencyStore = item.prepareDataForStore();
        });
    }

    // For clear object outside
    get value() {
        const data: any = super.value;
        const fields: string[] = this.nameOfCurrencyField;

        data.activityMonthFrom = moment(this.activityMonthFrom).format(Configuration.format.serverDate);
        data.duration = this.duration;
        data.durationForBudget = this.durationForBudget;
        data.brandId = this.brandId || 0;

        fields.forEach((item: string) => {
            data[item] = this.getPropertyFromStore(item);
        });

        data.placingBanner = this.placingBanner;
        data.firstLinkSearchOptimizationService = this.firstLinkSearchOptimizationService;
        data.actionWithGoodsSearchOptimizationService = this.actionWithGoodsSearchOptimizationService;
        data.searchingForINNSearchOptimizationService = this.searchingForINNSearchOptimizationService;
        data.promotionalArticlesConsumerAwareness = this.promotionalArticlesConsumerAwareness;
        data.recommendedRelatedProductsConsumerAwareness = this.recommendedRelatedProductsConsumerAwareness;
        data.targetMailing = this.targetMailing;
        data.massMailing = this.massMailing;
        data.richContentPosting = this.richContentPosting;
        data.participationMetaCategories = this.participationMetaCategories;
        data.promotionalCodeProduct = this.promotionalCodeProduct;

        data.eCommerceSkus = [];
        (this.eCommerceSkus || []).forEach((item: any) => {
            data.eCommerceSkus.push({
                id: this.id == null ? 0 : item.id,
                eCommerceId: this.id,
                eCommerceVersion: this.version,
                skuId: item.skuId
            });
        });

        return data;
    }
}
