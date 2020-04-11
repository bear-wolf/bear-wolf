export class TrainingDocument {
    id: number;
    docNumber: number;
    docDateFrom: Date;
    additionalAgreementNumber: string;
    applicationNumber: string;
    iDworkflow: number;
    trainingId: number;

    constructor(data: any, trainingId: number) {
        if (data) {
            this.id = data.id;
            this.trainingId = trainingId;

            this.docNumber = Number(data.docNumber || 0);
            this.docDateFrom = new Date(data.docDateFrom);
            this.additionalAgreementNumber = data.additionalAgreementNumber;
            this.applicationNumber = data.applicationNumber;
            this.iDworkflow = data.iDworkflow;
        }
    }

    set value(data: any) {
        this.id = data.id;
        this.trainingId = data.trainingId;
        this.docNumber = data.docNumber;
        this.docDateFrom = data.docDateFrom;
        this.additionalAgreementNumber = data.additionalAgreementNumber;
        this.applicationNumber = data.applicationNumber;
        this.iDworkflow = Number(data.iDworkflow || '0');
    }

    get value() {
        return {
            id: this.id,
            trainingId: this.trainingId,
            docNumber: this.docNumber,
            docDateFrom: this.docDateFrom,
            additionalAgreementNumber: this.additionalAgreementNumber,
            applicationNumber: this.applicationNumber,
            iDworkflow: this.iDworkflow
        }
    }
}
