import { Activity } from '../activity.model';
import { JointAgreementLink } from './joint-agreement-link.model';
import { Period } from '@shared/models/period.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class JointAgreement extends Activity {
  jointAgreementLink: JointAgreementLink[] = [];
  activityPeriod: Period;

  constructor(currencyService: CurrencyService, data) {
    super(data, currencyService);

    (data.jointAgreementLink || []).forEach((item) => {
      this.jointAgreementLink.push(new JointAgreementLink(item));
    });
    this.toJointAgreement = false;
    this.activityPeriod = new Period(data.activityPeriodFrom || new Date(), data.activityPeriodTo || new Date());

    // super.createCurrencyObject(this.nameOfCurrencyField, data);
    // this.getCurrencyStore();
  }

  set pushCurrencyStore(data: any) {
  }

  get value() {
    const data: any = super.value;
    // const fields: string[] = this.nameOfCurrencyField;
    data.jointAgreementLink = [];

    // fields.forEach((item: string) => {
    //   data[item] = this.getPropertyFromStore(item);
    // });

    (this.jointAgreementLink || []).forEach((item: JointAgreementLink) => {
      data.jointAgreementLink.push(item.value);
    });

    return data;
  }

  get nameOfCurrencyField(): string[] {
    return [ ];
  }


}
