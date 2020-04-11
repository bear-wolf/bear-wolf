import {DrugInformationGroup} from '../activity-shared/drug-information-group.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class VolumeAgreementGroup extends DrugInformationGroup {
    volumeAgreementId: string;
    volumeAgreementVersion: number;

    constructor(
        currencyService: CurrencyService,
        data: any) {
        super(currencyService, data);

        this.volumeAgreementId = data.volumeAgreementId;
        this.volumeAgreementVersion = data.volumeAgreementVersion;
    }

    get value() {
        const data: any = super.value;

        data.volumeAgreementId = this.volumeAgreementId;
        data.volumeAgreementVersion = this.volumeAgreementVersion;

        return data;
    }
}