import {DrugInformationGroup} from '../activity-shared/drug-information-group.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class BonusAgreementGroup extends DrugInformationGroup {
    bonusAgreementId: string;
    bonusAgreementVersion: number;

    constructor(
        currencyService: CurrencyService,
        data: any) {
        super(currencyService, data);

        this.bonusAgreementId = data.bonusAgreementId;
        this.bonusAgreementVersion = data.bonusAgreementVersion;
    }

    get value() {
        const data: any = super.value;

        data.bonusAgreementId = this.bonusAgreementId;
        data.bonusAgreementVersion = this.bonusAgreementVersion;

        return data;
    }
}