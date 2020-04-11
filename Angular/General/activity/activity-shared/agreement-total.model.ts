import {DrugInformation} from '../activity-volume-agreement/drug-information.model';
import {VolumeAgreementGroup} from '../activity-volume-agreement/volume-agreement-group';
import {BonusAgreementGroup} from '../activity-bonus-agreement/bonus-agreement-group';

export class AgreementTotal {
    scale1: number = 0;
    scale2: number = 0;
    scale3: number = 0;
    fact: number = 0;
    directPosting: number;
    revers: number;
    drugInformation: DrugInformation[];

    constructor(data, drugInformation: any[]) {
        data = data || {};

        // this.scale1 = data.scale1;
        // this.scale2 = data.scale2;
        // this.scale3 = data.scale3;
        // this.fact = data.fact;
        this.directPosting = data.directPosting;
        this.revers = data.revers;
    }

    getCalculation(): any {
        (this.drugInformation || []).forEach((item) => {
            switch (item.currentScale) {
                case 1: {
                    this.scale1 += item.scalesList[0].planRubPrice;
                    break;
                }
                case 2: {
                    this.scale2 += item.scalesList[1].planRubPrice;
                    break;
                }
                case 3: {
                    this.scale3 += item.scalesList[2].planRubPrice;
                    break;
                }
            }
        });
    }

    calcRevers() {
        this.revers = this.directPosting - this.fact;
    }
}