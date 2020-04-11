import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {BonusAgreement} from './bonus-agreement.model';
import {BonusAgreementService} from './bonus-agreement.service';

@Injectable({providedIn: 'root'})
export class ActivityBonusAgreementResolver implements Resolve<BonusAgreement> {
    constructor(
        private bonusAgreementService: BonusAgreementService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BonusAgreement> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.bonusAgreementService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const bonusAgreement: BonusAgreement = item[1];

                object.next(bonusAgreement.setMarketingPlan(mp));
                object.complete();
            });
        });

        return observer;
    }
}
