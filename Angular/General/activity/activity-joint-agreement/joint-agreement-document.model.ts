export class JointAgreementDocument {
    id: number;
    docNumber: number;
    docDateFrom: Date;
    additionalAgreementNumber: string;
    applicationNumber: string;
    iDworkflow: number;
    jointAgreementId: number;

    constructor(data: any, jointAgreementId: number) {
        if (data) {
            this.id = data.id;
            this.jointAgreementId = jointAgreementId;

            this.docNumber = Number(data.docNumber || 0);
            this.docDateFrom = new Date(data.docDateFrom);
            this.additionalAgreementNumber = data.additionalAgreementNumber;
            this.applicationNumber = data.applicationNumber;
            this.iDworkflow = data.iDworkflow;
        }
    }

    set value(data: any) {
        this.id = data.id;
        this.jointAgreementId = data.jointAgreementId;
        this.docNumber = data.docNumber;
        this.docDateFrom = data.docDateFrom;
        this.additionalAgreementNumber = data.additionalAgreementNumber;
        this.applicationNumber = data.applicationNumber;
        this.iDworkflow = Number(data.iDworkflow || '0');
    }

    get value() {
        return {
            id: this.id,
            jointAgreementId: this.jointAgreementId,
            docNumber: this.docNumber,
            docDateFrom: this.docDateFrom,
            additionalAgreementNumber: this.additionalAgreementNumber,
            applicationNumber: this.applicationNumber,
            iDworkflow: this.iDworkflow
        }
    }
}
