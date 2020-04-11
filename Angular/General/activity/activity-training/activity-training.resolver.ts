import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {Training} from './training.model';
import {TrainingService} from './training.service';
import {MarketingPlanService} from '../../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../../marketing-plan/marketing-plan.model';

@Injectable({providedIn: 'root'})
export class ActivityTrainingResolver implements Resolve<Training> {
    constructor(
        private trainingService: TrainingService,
        private marketingPlanService: MarketingPlanService,
        public route: ActivatedRoute,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
        const observer = new Observable<any>((object) => {
            const id = route.url[0].path;
            const version = route.url[1].path;
            const mpid = route.queryParams.mpid;

            forkJoin([
                this.marketingPlanService.get(mpid),
                this.trainingService.getByIdVersion(id, version)
            ]).subscribe((item) => {
                const mp: MarketingPlan = item[0];
                const training: Training = item[1];

                training.setMarketingPlan(mp);
                object.next(training);
                object.complete();
            });
        });

        return observer;
    }
}
