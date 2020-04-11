import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {ECommerce} from '../e-commerce.model';
import {iOption} from '@shared/models/option.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {FormControlsInputComponent} from '@shared/modules/form-controls/form-controls-input/form-controls-input.component';
import {FormControlsCheckComponent} from '@shared/modules/form-controls/form-controls-check/form-controls-check.component';
import {FormControlsComponent} from '@shared/modules/form-controls/form-controls/form-controls.component';

@Component({
  selector: 'app-activity-e-commerce-common-activity-types',
  templateUrl: './activity-e-commerce-common-activity-types.component.html',
  styleUrls: ['./activity-e-commerce-common-activity-types.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityECommerceCommonActivityTypesComponent extends CommonInner implements OnInit {
  @Input()
  eCommerce: ECommerce;

  period: iOption[];

  constructor(
      public fb: FormBuilder,
      public dataService: DataService
  ) {
    super(fb);
    this.period = this.dataService.getPeriod();
  }

  ngOnInit(): void {
    super.ngOnInit(this.eCommerce);

    this.buildForm({
      placingBanner: [this.eCommerce.placingBanner, Validators.required],
      placingBannerInvestmentPlanPrice: [this.eCommerce.placingBannerInvestmentPlanPrice],
      placingBannerInvestmentFactPrice: [this.eCommerce.placingBannerInvestmentFactPrice],
      placingBannerPlanPrice: [this.eCommerce.placingBannerPlanPrice],
      placingBannerFactPrice: [this.eCommerce.placingBannerFactPrice],
      firstLinkSearchOptimizationService: [this.eCommerce.firstLinkSearchOptimizationService],
      firstLinkSearchOptimizationServiceInvestmentPlanPrice: [this.eCommerce.firstLinkSearchOptimizationServiceInvestmentPlanPrice],
      firstLinkSearchOptimizationServiceInvestmentFactPrice: [this.eCommerce.firstLinkSearchOptimizationServiceInvestmentFactPrice],
      firstLinkSearchOptimizationServicePlanPrice: [this.eCommerce.firstLinkSearchOptimizationServicePlanPrice],
      firstLinkSearchOptimizationServiceFactPrice: [this.eCommerce.firstLinkSearchOptimizationServiceFactPrice],
      actionWithGoodsSearchOptimizationService: [this.eCommerce.actionWithGoodsSearchOptimizationService],
      actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice: [this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice],
      actionWithGoodsSearchOptimizationServiceInvestmentPlanFact: [this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentFactPrice],
      actionWithGoodsSearchOptimizationServicePlanPrice: [this.eCommerce.actionWithGoodsSearchOptimizationServicePlanPrice],
      actionWithGoodsSearchOptimizationServiceFactPrice: [this.eCommerce.actionWithGoodsSearchOptimizationServiceFactPrice],

      searchingForINNSearchOptimizationService: [this.eCommerce.searchingForINNSearchOptimizationService],
      searchingForINNSearchOptimizationServiceInvestmentPlanPrice: [this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentPlanPrice],
      searchingForINNSearchOptimizationServiceInvestmentFactPrice: [this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentFactPrice],
      searchingForINNSearchOptimizationServicePlanPrice: [this.eCommerce.searchingForINNSearchOptimizationServicePlanPrice],
      searchingForINNSearchOptimizationServiceFactPrice: [this.eCommerce.searchingForINNSearchOptimizationServiceFactPrice],

      promotionalArticlesConsumerAwareness: [this.eCommerce.promotionalArticlesConsumerAwareness],
      promotionalArticlesConsumerAwarenessInvestmentPlanPrice: [this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentPlanPrice],
      promotionalArticlesConsumerAwarenessInvestmentFactPrice: [this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentFactPrice],
      promotionalArticlesConsumerAwarenessPlanPrice: [this.eCommerce.promotionalArticlesConsumerAwarenessPlanPrice],
      promotionalArticlesConsumerAwarenessFactPrice: [this.eCommerce.promotionalArticlesConsumerAwarenessFactPrice],

      recommendedRelatedProductsConsumerAwareness: [this.eCommerce.recommendedRelatedProductsConsumerAwareness],
      recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice: [this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice],
      recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice: [this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice],
      recommendedRelatedProductsConsumerAwarenessPlanPrice: [this.eCommerce.recommendedRelatedProductsConsumerAwarenessPlanPrice],
      recommendedRelatedProductsConsumerAwarenessFactPrice: [this.eCommerce.recommendedRelatedProductsConsumerAwarenessFactPrice],

      targetMailing: [this.eCommerce.targetMailing],
      targetMailingInvestmentPlanPrice: [this.eCommerce.targetMailingInvestmentPlanPrice],
      targetMailingInvestmentFactPrice: [this.eCommerce.targetMailingInvestmentFactPrice],
      targetMailingPlanPrice: [this.eCommerce.targetMailingPlanPrice],
      targetMailingFactPrice: [this.eCommerce.targetMailingFactPrice],

      massMailing: [this.eCommerce.massMailing],
      massMailingInvestmentPlanPrice: [this.eCommerce.massMailingInvestmentPlanPrice],
      massMailingInvestmentFactPrice: [this.eCommerce.massMailingInvestmentFactPrice],
      massMailingPlanPrice: [this.eCommerce.massMailingPlanPrice],
      massMailingFactPrice: [this.eCommerce.massMailingFactPrice],

      richContentPosting: [this.eCommerce.richContentPosting],
      richContentPostingInvestmentPlanPrice: [this.eCommerce.richContentPostingInvestmentPlanPrice],
      richContentPostingInvestmentFactPrice: [this.eCommerce.richContentPostingInvestmentFactPrice],
      richContentPostingPlanPrice: [this.eCommerce.richContentPostingPlanPrice],
      richContentPostingFactPrice: [this.eCommerce.richContentPostingFactPrice],

      participationMetaCategories: [this.eCommerce.participationMetaCategories],
      participationMetaCategoriesInvestmentPlanPrice: [this.eCommerce.participationMetaCategoriesInvestmentPlanPrice],
      participationMetaCategoriesInvestmentFactPrice: [this.eCommerce.participationMetaCategoriesInvestmentFactPrice],
      participationMetaCategoriesPlanPrice: [this.eCommerce.participationMetaCategoriesPlanPrice],
      participationMetaCategoriesFactPrice: [this.eCommerce.participationMetaCategoriesFactPrice],

      promotionalCodeProduct: [this.eCommerce.promotionalCodeProduct],
      promotionalCodeProductInvestmentPlanPrice: [this.eCommerce.promotionalCodeProductInvestmentPlanPrice],
      promotionalCodeProductInvestmentFactPrice: [this.eCommerce.promotionalCodeProductInvestmentFactPrice],
      promotionalCodeProductPlanPrice: [this.eCommerce.promotionalCodeProductPlanPrice],
      promotionalCodeProductFactPrice: [this.eCommerce.promotionalCodeProductFactPrice],
    });
  }

  checkStatus(element: FormControlsComponent) {
    return !element.value;
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.validation()) {
      return;
    }

    const data = this.form.getRawValue();
    this.eCommerce.placingBanner = data.placingBanner || false;
    this.eCommerce.placingBannerInvestmentPlanPrice = Number(data.placingBannerInvestmentPlanPrice || 0);
    this.eCommerce.placingBannerInvestmentFactPrice = Number(data.placingBannerInvestmentFactPrice || 0);
    this.eCommerce.placingBannerPlanPrice = Number(data.placingBannerPlanPrice || 0);
    this.eCommerce.placingBannerFactPrice = Number(data.placingBannerFactPrice || 0);

    this.eCommerce.firstLinkSearchOptimizationService = data.firstLinkSearchOptimizationService;
    this.eCommerce.firstLinkSearchOptimizationServiceInvestmentPlanPrice = Number(data.firstLinkSearchOptimizationServiceInvestmentPlanPrice || 0);
    this.eCommerce.firstLinkSearchOptimizationServiceInvestmentFactPrice = Number(data.firstLinkSearchOptimizationServiceInvestmentFactPrice || 0);
    this.eCommerce.firstLinkSearchOptimizationServicePlanPrice = Number(data.firstLinkSearchOptimizationServicePlanPrice || 0);
    this.eCommerce.firstLinkSearchOptimizationServiceFactPrice = Number(data.firstLinkSearchOptimizationServiceFactPrice || 0);

    this.eCommerce.actionWithGoodsSearchOptimizationService = data.actionWithGoodsSearchOptimizationService;
    this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice = Number(data.actionWithGoodsSearchOptimizationServiceInvestmentPlanPrice || 0);
    this.eCommerce.actionWithGoodsSearchOptimizationServiceInvestmentFactPrice = Number(data.actionWithGoodsSearchOptimizationServiceInvestmentFactPrice || 0);
    this.eCommerce.actionWithGoodsSearchOptimizationServicePlanPrice = Number(data.actionWithGoodsSearchOptimizationServicePlanPrice || 0);
    this.eCommerce.actionWithGoodsSearchOptimizationServiceFactPrice = Number(data.actionWithGoodsSearchOptimizationServiceFactPrice || 0);

    this.eCommerce.searchingForINNSearchOptimizationService = data.searchingForINNSearchOptimizationService;
    this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentPlanPrice = Number(data.searchingForINNSearchOptimizationServiceInvestmentPlanPrice || 0);
    this.eCommerce.searchingForINNSearchOptimizationServiceInvestmentFactPrice = Number(data.searchingForINNSearchOptimizationServiceInvestmentFactPrice || 0);
    this.eCommerce.searchingForINNSearchOptimizationServicePlanPrice = Number(data.searchingForINNSearchOptimizationServicePlanPrice || 0);
    this.eCommerce.searchingForINNSearchOptimizationServiceFactPrice = Number(data.searchingForINNSearchOptimizationServiceFactPrice || 0);

    this.eCommerce.promotionalArticlesConsumerAwareness = data.promotionalArticlesConsumerAwareness;
    this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentPlanPrice = Number(data.promotionalArticlesConsumerAwarenessInvestmentPlanPrice || 0);
    this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentFactPrice = Number(data.promotionalArticlesConsumerAwarenessInvestmentFactPrice || 0);
    this.eCommerce.promotionalArticlesConsumerAwarenessPlanPrice = Number(data.promotionalArticlesConsumerAwarenessPlanPrice || 0);
    this.eCommerce.promotionalArticlesConsumerAwarenessInvestmentFactPrice = Number(data.promotionalArticlesConsumerAwarenessInvestmentFactPrice || 0);

    this.eCommerce.recommendedRelatedProductsConsumerAwareness = data.recommendedRelatedProductsConsumerAwareness;
    this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice = Number(data.recommendedRelatedProductsConsumerAwarenessInvestmentPlanPrice || 0);
    this.eCommerce.recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice = Number(data.recommendedRelatedProductsConsumerAwarenessInvestmentFactPrice || 0);
    this.eCommerce.recommendedRelatedProductsConsumerAwarenessPlanPrice = Number(data.recommendedRelatedProductsConsumerAwarenessPlanPrice || 0);
    this.eCommerce.recommendedRelatedProductsConsumerAwarenessFactPrice = Number(data.recommendedRelatedProductsConsumerAwarenessFactPrice || 0);

    this.eCommerce.targetMailing = data.targetMailing;
    this.eCommerce.targetMailingInvestmentPlanPrice = Number(data.targetMailingInvestmentPlanPrice || 0);
    this.eCommerce.targetMailingInvestmentFactPrice = Number(data.targetMailingInvestmentFactPrice || 0);
    this.eCommerce.targetMailingPlanPrice = Number(data.targetMailingPlanPrice || 0);
    this.eCommerce.targetMailingFactPrice = Number(data.targetMailingFactPrice || 0);

    this.eCommerce.massMailing = data.massMailing;
    this.eCommerce.massMailingInvestmentPlanPrice = Number(data.massMailingInvestmentPlanPrice || 0);
    this.eCommerce.massMailingInvestmentFactPrice = Number(data.massMailingInvestmentFactPrice || 0);
    this.eCommerce.massMailingPlanPrice = Number(data.massMailingPlanPrice || 0);
    this.eCommerce.massMailingFactPrice = Number(data.massMailingFactPrice || 0);

    this.eCommerce.richContentPosting = data.richContentPosting;
    this.eCommerce.richContentPostingInvestmentPlanPrice = Number(data.richContentPostingInvestmentPlanPrice || 0);
    this.eCommerce.richContentPostingInvestmentFactPrice = Number(data.richContentPostingInvestmentFactPrice || 0);
    this.eCommerce.richContentPostingPlanPrice = Number(data.richContentPostingPlanPrice || 0);
    this.eCommerce.richContentPostingFactPrice = Number(data.richContentPostingFactPrice || 0);

    this.eCommerce.participationMetaCategories = data.participationMetaCategories;
    this.eCommerce.participationMetaCategoriesInvestmentPlanPrice = Number(data.participationMetaCategoriesInvestmentPlanPrice || 0);
    this.eCommerce.participationMetaCategoriesInvestmentFactPrice = Number(data.participationMetaCategoriesInvestmentFactPrice || 0);
    this.eCommerce.participationMetaCategoriesPlanPrice = Number(data.participationMetaCategoriesPlanPrice || 0);
    this.eCommerce.participationMetaCategoriesFactPrice = Number(data.participationMetaCategoriesFactPrice || 0);

    this.eCommerce.promotionalCodeProduct = data.promotionalCodeProduct;
    this.eCommerce.promotionalCodeProductInvestmentPlanPrice = Number(data.promotionalCodeProductInvestmentPlanPrice || 0);
    this.eCommerce.promotionalCodeProductInvestmentFactPrice = Number(data.promotionalCodeProductInvestmentFactPrice || 0);
    this.eCommerce.promotionalCodeProductPlanPrice = Number(data.promotionalCodeProductPlanPrice || 0);
    this.eCommerce.promotionalCodeProductFactPrice = Number(data.promotionalCodeProductFactPrice || 0);
  }
}
