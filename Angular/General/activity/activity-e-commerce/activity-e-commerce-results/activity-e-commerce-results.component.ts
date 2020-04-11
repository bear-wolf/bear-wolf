import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {ECommerce} from '../e-commerce.model';
import {iOption} from '@shared/models/option.model';
import {FormBuilder} from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {DocumentType} from '@shared/components/document/document-type.model';
import {ECommerceSku} from '../e-commerce-sku.model';
import {CurrencyEnum} from '@shared/enums/currency.enum';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {DocumentComponent} from '@shared/components/document/document.component';

@Component({
    selector: 'app-activity-e-commerce-results',
    templateUrl: './activity-e-commerce-results.component.html',
    styleUrls: ['./activity-e-commerce-results.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityECommerceResultsComponent extends CommonInner implements OnInit, OnChanges {
    @Input()
    eCommerce: ECommerce;

    period: iOption[];
    total: any;
    totalSku: any;

    @ViewChildren('innerFormComponent') innerFormComponents;

    eCommerceSkus: ECommerceSku[];

    constructor(
        public fb: FormBuilder,
        public dataService: DataService,
        public currencyService: CurrencyService
    ) {
        super(fb);
        this.period = this.dataService.getPeriod();
    }

    ngOnInit() {
        super.ngOnInit(this.eCommerce);
        this.loadDocument();

        this.prepareTotal();
        this.prepareCommonTotal();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes.eCommerce) {
            this.eCommerce = changes.eCommerce.currentValue;
        }
    }

    prepareCommonTotal() {

    }

    get investmentsPlan() {
        const value = this.eCommerce.placingBannerInvestmentPlanPrice
            + this.eCommerce.firstLinkSearchOptimizationServicePlanPrice
            + this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice
            + this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentPlanPrice
            + this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentPlanPrice
            + this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice
            + this.eCommerce.targetMailingInvestmentPlanPrice
            + this.eCommerce.massMailingInvestmentPlanPrice
            + this.eCommerce.richContentPostingInvestmentPlanPrice
            + this.eCommerce.participationMetaCategoriesInvestmentPlanPrice
            + this.eCommerce.promotionalCodeProductInvestmentPlanPrice;

        return value;
    }

    get investmentsFact() {
        const value = this.eCommerce.placingBannerInvestmentFactPrice
            + this.eCommerce.firstLinkSearchOptimizationServiceFactPrice
            + this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentFactPrice
            + this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentFactPrice
            + this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentFactPrice
            + this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice
            + this.eCommerce.targetMailingInvestmentFactPrice
            + this.eCommerce.massMailingInvestmentFactPrice
            + this.eCommerce.richContentPostingInvestmentFactPrice
            + this.eCommerce.participationMetaCategoriesInvestmentFactPrice
            + this.eCommerce.promotionalCodeProductInvestmentFactPrice;

        return value;
    }

    get salesIncreasePlan() {
        const value = this.eCommerce.placingBannerPlanPrice
            + this.eCommerce.firstLinkSearchOptimizationServicePlanPrice
            + this.eCommerce.actionWithGoodsSearchOptimizationServicePlanPrice
            + this.eCommerce.searchingForINNSearchOptimizationServicePlanPrice
            + this.eCommerce.promotionalArticlesConsumerAwarenessPlanPrice
            + this.eCommerce.recommendedRelatedProductsConsumerAwarenessPlanPrice
            + this.eCommerce.targetMailingPlanPrice
            + this.eCommerce.massMailingPlanPrice
            + this.eCommerce.richContentPostingPlanPrice
            + this.eCommerce.participationMetaCategoriesPlanPrice
            + this.eCommerce.promotionalCodeProductPlanPrice

        return value;
    }

    get salesIncreaseFact() {
        const value = this.eCommerce.placingBannerFactPrice
            + this.eCommerce.firstLinkSearchOptimizationServiceFactPrice
            + this.eCommerce.actionWithGoodsSearchOptimizationServiceFactPrice
            + this.eCommerce.searchingForINNSearchOptimizationServiceFactPrice
            + this.eCommerce.promotionalArticlesConsumerAwarenessFactPrice
            + this.eCommerce.recommendedRelatedProductsConsumerAwarenessFactPrice
            + this.eCommerce.targetMailingFactPrice
            + this.eCommerce.massMailingFactPrice
            + this.eCommerce.richContentPostingFactPrice
            + this.eCommerce.participationMetaCategoriesFactPrice
            + this.eCommerce.promotionalCodeProductFactPrice

        return value;
    }

    get roiContractPlan() {
        const value = 0;

        return value;
    }

    get roiContractFact() {
        const value = 0;

        return value;
    }

    get directPosting() {
        const value = 0;

        return value;
    }

    get reverse() {
        const value = 0;

        return value;
    }

    prepareTotal() {
        if (this.eCommerce.eCommerceSkus) {
            this.totalSku = {
                roiFact: 0,
                roiPlan: 0,
                salesForecast: 0,
                totalCostAbbottActionPlan: 0,
                salesDuringActionPlan: 0,
                salesDuringActionFact: 0,
                totalCostAbbottActionFact: 0,
                reverse: 0
            };

            this.eCommerceSkus = this.eCommerce.eCommerceSkus;
            const currencyName = this.eCommerce.currencyName;

            (this.eCommerce.eCommerceSkus || []).forEach((item) => {
                this.totalSku.roiFact += item.roiFact || 0;
                this.totalSku.roiPlan += item.roiPlan || 0;
                this.totalSku.salesForecast += item.salesForecast[currencyName] || 0;
                this.totalSku.totalCostAbbottActionPlan += item.totalCostAbbottActionPlan[currencyName] || 0;
                this.totalSku.salesDuringActionPlan += item.salesDuringActionPlan[currencyName] || 0;
                this.totalSku.salesDuringActionFact += item.salesDuringActionFact[currencyName] || 0;
                this.totalSku.totalCostAbbottActionFact += item.totalCostAbbottActionFact[currencyName] || 0;
                this.totalSku.reverse += item.reverse[currencyName] || 0;
            });
        }
    }

    submit() {
        this.appDocument.forEach((childComponent: any) => {
            if (!this.eCommerce.isActivityStatusDraft) {
                this.valid = childComponent.isValid();
                if (!this.valid) {
                    return;
                }
            }
            childComponent.submit();
        });
    }
}
