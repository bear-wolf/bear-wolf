import {Activity} from '../activity.model';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {VolumeAgreementProjectEnum} from './volume-agreement-project.enum';
import {CurrencyService} from '@shared/components/currency/currency.service';
import {VolumeAgreementGroup} from './volume-agreement-group';

export class VolumeAgreement extends Activity {
    additionalAgreementNumber: string;
    addToVolumeContract: boolean;
    applicationNumber: string;
    contractDate: string;
    contractNumber: string;
    drugInformationGroup: VolumeAgreementGroup[] = [];
    hasConsiderSecondaryDB: boolean;
    ndsPercent: number;
    premiumSize: number;
    units: any;
    pointsInActivity: number;
    project: VolumeAgreementProjectEnum;
    premium: number;
    scale1: number;
    scale2: number;
    scale3: number;
    factInvestment: number;
    directPosting: number;
    revers: number;

    constructor(
        currencyService: CurrencyService,
        data: any
    ) {
        super(data, currencyService);

        data = data || {};
        this.pointsInActivity = data.pointsInActivity || 0;
        this.ndsPercent = data.ndsPercent || Configuration.ndsPercent || 20;
        this.hasConsiderSecondaryDB = data.hasConsiderSecondaryDB || false;
        this.project = data.project || 0;
        this.contractNumber = data.contractNumber;
        this.contractDate = data.contractDate;
        this.additionalAgreementNumber = data.additionalAgreementNumber;
        this.applicationNumber = data.applicationNumber;
        this.premiumSize = Number(data.premiumSize || 0);
        this.units = data.units;
        this.addToVolumeContract = data.addToVolumeContract || false;
        this.factInvestment = data.factInvestment || 0;

        (data.drugInformationGroup || []).forEach((item) => {
            this.drugInformationGroup.push(new VolumeAgreementGroup(currencyService, item));
        });

        super.createCurrencyObject(this.nameOfCurrencyField, data);
        this.getCurrencyStore();
    }

    getCurrencyStore(data?: any) {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });

        (this.drugInformationGroup || []).forEach((group) => {
            (group.drugInformation || []).forEach((item) => {
                item.getCurrencyStore();
            });
        });
    }

    get nameOfCurrencyField(): string[] {
        return [
            'premium',
            'scale1',
            'scale2',
            'scale3',
            'factInvestment',
            'directPosting',
            'revers'
        ];
    }

    set pushCurrencyStore(data: any) {
        const name = this.currencyService.currentCurrencyName;
        Object.keys(data).forEach((key, index) => {
            this.store[key] = this.store[key] || {};
            this.store[key][name] = data[key];
        });

        (this.drugInformationGroup || []).forEach((group) => {
            (group.drugInformation || []).forEach((item) => {
                item.pushCurrencyStore = item.prepareDataForStore();
            });
        });
    }

    get value() {
        const data: any = super.value;
        //const fields: string[] = this.nameOfCurrencyField;

        data.project = Number(this.project);
        data.pointsInActivity = Number(this.pointsInActivity);
        data.ndsPercent = Number(this.ndsPercent);
        data.hasConsiderSecondaryDB = !!this.hasConsiderSecondaryDB;
        data.premiumSize = this.premiumSize;
        data.factInvestment = Number(this.factInvestment);
        data.units = this.units;
        data.addToVolumeContract = !!this.addToVolumeContract;

        data.drugInformationGroup = [];
        (this.drugInformationGroup || []).forEach((item: VolumeAgreementGroup) => {
            data.drugInformationGroup.push(item.value);
        });


        return data;
    }
}
