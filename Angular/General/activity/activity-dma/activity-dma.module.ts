import {CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import { ActivityDmaComponent } from './activity-dma.component';
import { ActivitySharedModule } from '../activity-shared/activity-shared.module';
import { ActivityDmaRoutingModule } from './activity-dma-routing.module';
import {ActivityDmaCommonInfoComponent} from './activity-dma-common-info/activity-dma-common-info.component';
import {ActivityDmaItemSupportComponent} from './activity-dma-item-support/activity-dma-item-support.component';
import {ActivityDmaMethodologyComponent} from './activity-dma-methodology/activity-dma-methodology.component';
import {ActivityDmaSkuComponent} from './activity-dma-sku/activity-dma-sku.component';
import { ActivityDmaStockEconomicsComponent } from './activity-dma-stock-economics/activity-dma-stock-economics.component';
import {ActivityDmaStockSalesForecastComponent} from './activity-dma-stock-sales-forecast/activity-dma-stock-sales-forecast.component';
import { ActivityDmaForecastComponent } from './activity-dma-forecast/activity-dma-forecast.component';
import {DmaService} from './dma.service';
import { ActivityDmaAdditionalPromotionEffectComponent } from './activity-dma-additional-promotion-effect/activity-dma-additional-promotion-effect.component';
import { ActivityDmaSkuDetailsComponent } from './activity-dma-sku-details/activity-dma-sku-details.component';
import { ActivityDmaSkuTotalsComponent } from './activity-dma-sku-totals/activity-dma-sku-totals.component';
import { ActivityDmaDocumentsComponent } from './activity-dma-documents/activity-dma-documents.component';
import { ActivityDmaResultsComponent } from './activity-dma-results/activity-dma-results.component';
import { ActivityDmaChartsComponent } from './activity-dma-charts/activity-dma-charts.component';
import {ActivityDmaTotalComponent} from "./activity-dma-total/activity-dma-total.component";

@NgModule({
  declarations: [
    ActivityDmaComponent,
    ActivityDmaCommonInfoComponent,
    ActivityDmaItemSupportComponent,
    ActivityDmaMethodologyComponent,
    ActivityDmaStockSalesForecastComponent,
    ActivityDmaSkuComponent,
    ActivityDmaStockEconomicsComponent,
    ActivityDmaForecastComponent,
    ActivityDmaAdditionalPromotionEffectComponent,
    ActivityDmaSkuDetailsComponent,
    ActivityDmaSkuTotalsComponent,
    ActivityDmaDocumentsComponent,
    ActivityDmaResultsComponent,
    ActivityDmaChartsComponent,
    ActivityDmaTotalComponent
  ],
  imports: [
    ActivitySharedModule,
    ActivityDmaRoutingModule
  ],
  providers: [
    DmaService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActivityDmaModule { }
