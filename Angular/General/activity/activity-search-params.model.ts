export class ActivitySearchParams {
  id?: number;
  brandIds?: number;
  bUIds?: number;
  activityType?: number;
  marketingPlanId?: number;
  activityStatus?: number;
  created?: Date;
  pharmacyNetworkName?: string;
  kam?: string;
  akam?: string;
  periodFrom?: number;
  periodTo?: number;
  category?: any;
  segment?: any;

  constructor(
    data: any
  ) {
    Object.assign(this, data);
  }
}
