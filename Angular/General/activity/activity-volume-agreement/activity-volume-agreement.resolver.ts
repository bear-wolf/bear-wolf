import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {VolumeAgreement} from './volume-agreement.model';
import {VolumeAgreementService} from './volume-agreement.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';

@Injectable({providedIn: 'root'})
export class ActivityVolumeAgreementResolver implements Resolve<VolumeAgreement> {
    constructor(
        private volumeAgreementService: VolumeAgreementService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VolumeAgreement> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.volumeAgreementService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const volumeAgreement: VolumeAgreement = item[1];

                object.next(volumeAgreement.setMarketingPlan(mp));
                object.complete();
            });
        });

        return observer;
    }
}
