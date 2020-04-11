import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {ECommerce} from './e-commerce.model';
import {ECommerceService} from './e-commerce.service';

@Injectable({providedIn: 'root'})
export class ActivityECommerceResolver implements Resolve<ECommerce> {
    constructor(
        private eCommerceService: ECommerceService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ECommerce> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.eCommerceService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const eCommerce: ECommerce = item[1];

                object.next(eCommerce.setMarketingPlan(mp));
                object.complete();
            });
        });

        return observer;
    }
}
