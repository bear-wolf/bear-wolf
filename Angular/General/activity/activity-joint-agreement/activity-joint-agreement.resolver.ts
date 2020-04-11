import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {JointAgreement} from './joint-agreement.model';
import {JointAgreementService} from './joint-agreement.service';

@Injectable({providedIn: 'root'})
export class ActivityJointAgreementResolver implements Resolve<JointAgreement> {
    constructor(
        private jointAgreementService: JointAgreementService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JointAgreement> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.jointAgreementService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const jointAgreement: JointAgreement = item[1];

                object.next(jointAgreement.setMarketingPlan(mp));
                object.complete();
            });
        });

        return observer;
    }
}
