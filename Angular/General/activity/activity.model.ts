import {MarketingPlan} from '../marketing-plan/marketing-plan.model';
import {ActivityTypeEnum} from './activity-type.enum';
import {ActivityStatusEnum} from './activity-status.enum';
import * as moment from 'moment';
import {DatePipe} from '@shared/modules/pipes/pipes/date.pipe';
import {PharmacyNetwork} from '@shared/models/pharmacy-network.model';
import {Configuration} from '@shared/modules/outer-config/models/config';
import {iDocumentVersion} from '@shared/components/document-version/document-version.model';
import {AkamAgreement} from './activity-shared/activity-akam-agreement/akam-agreement.model';
import {Period} from '@shared/models/period.model';
import {User} from '@shared/models/user.model';
import {Comment} from '@shared/models/comment.model';
import {Entity} from '@shared/components/entity.model';
import {DocumentType} from '@shared/components/document/document-type.model';
import {ActivityModeEnum} from './activity-mode.enum';
import {CurrencyEnum} from '@shared/enums/currency.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {CurrencyStoreService} from '@shared/services/currency-store.service';
import {CurrencyService} from '@shared/components/currency/currency.service';

export class Activity extends Entity {
    id: number;
    created: moment.Moment;
    marketingPlanId: number;
    marketingPlan: MarketingPlan;
    projects: string;
    akamAgreement: AkamAgreement;
    activityType: ActivityTypeEnum;
    comments: Comment[] = []; // all comments
    toJointAgreement: boolean = true; // show all ways
    activityStatus: ActivityStatusEnum;
    period: Period;
    activityPeriod: Period;
    activityDocument: DocumentType;
    version: number;
    /*Approval activity*/
    private checkApprovalButton: boolean = false;
    private _addedComment: boolean = false;
    private _update: BehaviorSubject<Activity> = new BehaviorSubject<Activity>(null);
    activityMode: ActivityModeEnum;

    public _currency: CurrencyEnum = CurrencyEnum.pricesDDP;
    public currencyService: CurrencyService;
    store: any; // inner storage

    constructor(data?: any, currencyService?: CurrencyService) {
        super(data);
        console.log(data);
        this.store = Object.create(null);
        data = data || {};
        this.currencyStore = data;
        this.currencyService = currencyService;
        this.activityMode = data.id ? ActivityModeEnum.EDIT : ActivityModeEnum.CREATE;
        this.id = data.id;
        this.version = data.version;
        this.created = moment(data.created || moment());
        this.marketingPlanId = parseInt(data.marketingPlanId, 10);
        this.marketingPlan = data.marketingPlan ? new MarketingPlan(data.marketingPlan) : null;
        this.projects = data.projects;
        this.activityDocument = data.activityDocument ? new DocumentType(data.activityDocument, this) : null;
        this.activityStatus = data.activityStatus || ActivityStatusEnum.DRAFT;

        (data.comments || []).forEach((item: Comment) => {
            this.comments.push(new Comment({
                activityVersion: this.version,
                message: item.message,
                role: item.role,
                userId: item.userId,
                id: item.id,
                activityId: item.activityId,
                user: item.user,
                date: item.date,
            }));
        });
        this.activityType = data.activityType;
        this.period = new Period(data.periodFrom || new Date(), data.periodTo || new Date());
        this.activityPeriod = new Period(data.activityPeriodFrom || new Date(), data.activityPeriodTo || new Date());
    }

    // way for update model
    get updateAsObservable(): Observable<Activity> {
        return this._update.asObservable();
    }

    get isActivityStatusDraft(): boolean {
        return this.activityStatus === ActivityStatusEnum.DRAFT;
    }

    updateState() {
        this._update.next(this);
    }

    get value() {
        const data: any = {
            periodFrom: moment(this.period.from).format(Configuration.format.serverDate),
            periodTo: moment(this.period.to).format(Configuration.format.serverDate),
            activityPeriodFrom: moment(this.activityPeriod.from).format(Configuration.format.serverDate),
            activityPeriodTo: moment(this.activityPeriod.to).format(Configuration.format.serverDate),
            activityType: this.activityType,
            marketingPlanId: this.marketingPlanId,
            activityStatus: Number(this.activityStatus),
            addToJointAgreement: this.addToJointAgreement,
            id: this.id,
            activityDocument: this.activityDocument ? this.activityDocument.value : null,
            comments: this.prepareComments()
        };

        return data;
    }

    set currency(id: CurrencyEnum) {
        /* Algorithm
        * 1. write date of model to store - current save
        * 2. For new id (new currency) need out date and write to model
        */
        this.pushCurrencyStore = this.prepareDataForStore();
        this._currency = id;
        this.getCurrencyStore();
    }

    // DEPRECATED
    get currency() {
        return this._currency;
    }
    /* get CurrencyEnum name */
    get currencyName(): string {
        if (!this.currencyService) {
            return null;
        }
        return this.currencyService.currentCurrencyName;
    }

    // all save
    set currencyStore(data: any) {
        this.store = this.store || Object.create(null);
        const value = {};
        Object.keys(data).forEach((key, index) => {
            if (typeof data[key] === 'object') {
                value[key] = data[key];
            }
        });
        this.store = value;
    }

    set pushCurrencyStore(data: any) {
        throw new DOMException('This handler "pushCurrencyStore" need override');
    }

    // setPushCurrencyStore(data: any) {
    //     const currency = CurrencyEnum[this._currency];
    //
    //     Object.keys(data).forEach((key, index) => {
    //         this._store[key][currency] = data[key];
    //     });
    // }

    getPropertyFromStore(name: string) {
        return this.store[name];
    }

    createStoreData(data?) {
        throw new DOMException('This handler "createStoreData" need override');
    }

    get nameOfCurrencyField(): string[] {
        throw new DOMException('This handler "nameOfCurrencyField" need override');
    }

    createCurrencyObject(name: string[], data?: any) {
        for (let i = 0; i <= 3; i++) {
            const key: string = CurrencyEnum[i];

            name.forEach((item: string) => {
                this.store[item] = this.store[item] || Object.create(null);
                this.store[item][key] = (data && data[item]) ? data[item][key] : 0;
            });
        }
    }

    prepareDataForStore(): any {
        const data: any = {};
        const name = this.nameOfCurrencyField;

        for (let i = 0; i <= 3; i++) {
            name.forEach((item: string) => {
                data[item] = this[item];
            });
        }

        return data;
    }

    getCurrencyStore(data?: any) {
        const key = this.currencyService.currentCurrencyName;
        const name: string[] = this.nameOfCurrencyField;

        name.forEach((item: string) => {
            this[item] = this.store[item][key];
        });
    }

    get userKAM() {
        if (!this.marketingPlan || !this.marketingPlan.pharmacyNetwork) {
            return '';
        }

        return this.marketingPlan.userKAM;
    }

    set approval(status: boolean) {
        this.checkApprovalButton = true;
    }

    set addedComment(status: boolean) {
        this._addedComment = true;
    }

    get addedComment() {
        return this._addedComment;
    }

    get isApproval(): boolean {
        return this._addedComment ? true : false;
    }

    get _period() {
        return this.period ? this.period.value : '';
    }

    get pharmacyNetwork(): PharmacyNetwork {
        if (!this.marketingPlan || !this.marketingPlan.pharmacyNetwork) {
            return null;
        }

        return this.marketingPlan.pharmacyNetwork;
    }

    setAkamAgreement(agreement: AkamAgreement) {
        this.akamAgreement = agreement;

        return this;
    }

    get userAKAM(): User {
        if (!this.marketingPlan || !this.marketingPlan.pharmacyNetwork) {
            return null;
        }

        return this.marketingPlan.userAKAM;
    }

    get user(): User {
        if (!this.marketingPlan || !this.marketingPlan.pharmacyNetwork) {
            return null;
        }

        return this.marketingPlan.userAKAM || this.marketingPlan.userKAM;
    }

    get _activityType() {
        return ActivityTypeEnum[this.activityType];
    }

    get _activityStatus() {
        return ActivityStatusEnum[this.activityStatus];
    }

    set _activityStatus(status: any) {
        this.activityStatus = status;
    }

    // call this handler from sendManager function!
    changeStatusByDraft() {
        if (this.isActivityStatusDraft) {
            this.activityStatus = ActivityStatusEnum.IN_COORDINATION_WITH_AKAM;
            this.updateState();
        }
    }

    setComment(comment: Comment) {
        this.comments = this.comments || [];
        this.comments.push(comment);

        return this;
    }

    get marketPlan(): string {
        return `#${this.marketingPlan.id}  ${DatePipe.prototype.transform(this.marketingPlan.dateCreated.toString())}`;
    }

    setMarketingPlan(marketingPlan: MarketingPlan) {
        this.marketingPlanId = marketingPlan.id;
        this.marketingPlan = marketingPlan;

        return this;
    }


    getActivityRoute() {
        let route: string = '';

        switch (this.activityType) {
            case ActivityTypeEnum.JointAgreement: {
                route = '/activities/joint-agreement';
                break;
            }
            case ActivityTypeEnum.BasicMarketing: {
                route = '/activities/basic-marketing';
                break;
            }
            case ActivityTypeEnum.VolumeAgreement: {
                route = '/activities/volume-agreement';
                break;
            }
            case ActivityTypeEnum.BonusAgreement: {
                route = '/activities/bonus-agreement';
                break;
            }
            case ActivityTypeEnum.Dma: {
                route = '/activities/dma';
                break;
            }
            case ActivityTypeEnum.Training: {
                route = '/activities/training';
                break;
            }
            case ActivityTypeEnum.Ecommerce: {
                route = '/activities/e-commerce';
                break;
            }

            default:
                break;
        }

        return route;
    }

    // before save to server
    prepareComments(): Comment[] {
        const data: Comment[] = [];

        this.comments.forEach((comment: Comment) => {
            data.push(comment.value);
        });
        return data;
    }
}
