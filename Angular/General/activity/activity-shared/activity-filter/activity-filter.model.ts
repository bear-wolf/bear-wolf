import {iOption} from '@shared/models/option.model';
import {Activity} from '../../activity.model';

export class ActivityFilter {
    categoryNetwork: iOption[] = [];
    categoryNetworkId: number;
    segmentNetwork: iOption[] = [];
    segmentNetworkId: number;
    listMPBrands: string[];
    activitiesList: iOption[] = [];
    private ready: boolean = false; // status prepare of data
    activity: Activity[]; // all record

    constructor(activity: Activity[]) {
        this.activity = activity;
    }

    parseCategory() {
        (this.activity || []).forEach((item) => {
            this.categoryNetwork.push({
                label: item.pharmacyNetwork.category,
                value: item.pharmacyNetwork.category,
            });
        });

        return this;
    }

    parseSegment() {
        (this.activity || []).forEach((item) => {
            this.segmentNetwork.push({
                label: item.pharmacyNetwork.segment,
                value: item.pharmacyNetwork.segment,
            });
        });
        return this;
    }

    get isReady(): boolean {
        return this.ready;
    }

    setReady(status: boolean) {
        this.ready = status;

        return this;
    }
}