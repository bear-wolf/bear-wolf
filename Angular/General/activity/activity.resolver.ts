import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {MarketingPlanService} from '../marketing-plan/marketing-plan.service';
import {MarketingPlan} from '../marketing-plan/marketing-plan.model';

@Injectable({ providedIn: 'root' })
export class ActivityResolver implements Resolve<MarketingPlan> {
  marketPlan: MarketingPlan;

  constructor(
    private marketPlanService: MarketingPlanService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MarketingPlan> | Promise<MarketingPlan> | MarketingPlan {
    const mpid = route.queryParams.mpid;
    const observer = new Observable<any>((object) => {
      object.next(mpid ? this.marketPlanService.get(mpid) : new MarketingPlan({}));
    });

    return mpid ? this.marketPlanService.get(mpid) : null;
  }
}
