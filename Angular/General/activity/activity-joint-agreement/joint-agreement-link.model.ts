export class JointAgreementLink {
    id: number;
    jointAgreementId: number;
    jointAgreementVersion: number;
    activityId: number;
    activityVersion: number;

    constructor(data: any) {
        this.id = data.id;
        this.jointAgreementId = data.jointAgreementId;
        this.jointAgreementVersion = data.jointAgreementVersion;
        this.activityId = data.activityId;
        this.activityVersion = data.activityVersion;
    }

    get value() {
        return {
            id: this.id,
            jointAgreementId: this.jointAgreementId,
            jointAgreementVersion: this.jointAgreementVersion,
            activityId: this.activityId,
            activityVersion: this.activityVersion
        };
    }
}
