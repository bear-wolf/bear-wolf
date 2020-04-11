import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {BasicMarketing} from './basic-marketing.model';
import {BasicMarketingService} from './basic-marketing.service';

@Injectable({providedIn: 'root'})
export class ActivityBasicMarketingResolver implements Resolve<BasicMarketing> {
    constructor(
        private basicMarketingService: BasicMarketingService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BasicMarketing> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.basicMarketingService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const basicMarketing: BasicMarketing = item[1];

                object.next(basicMarketing.setMarketingPlan(mp));
                object.complete();
            });
        });

        return observer;
    }
}
