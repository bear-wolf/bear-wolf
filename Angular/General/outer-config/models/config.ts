export interface iFormat {
    date: string;
    dateHhMm: string;
    serverDate: string;
    server: string;
}

export interface iPagination {
    rowsPerPageOptions: number[];
}

export interface iConfigComment {
    maxLength: number;
}

export class Configuration {
    static host = '';
    static production = false;
    static authHeader: string;
    static languages: any[];
    static notificationTimeOut: number;
    static format: iFormat;
    static decimal: number;
    static comment: iConfigComment;
    static ndsPercent: number;
    static pagination: iPagination;

    static reWrite(data: any){
        Configuration.host = data['host'];
        Configuration.production = data['production'];
        Configuration.authHeader = data['authHeader'];
        Configuration.languages = data['languages'];
        Configuration.format = data['format'];
        Configuration.notificationTimeOut = data['notificationTimeOut'];
        Configuration.decimal = Number(data['decimal'] || 0);
        Configuration.comment = data.comment;
        Configuration.ndsPercent = Number(data.ndsPercent || 0);
        Configuration.pagination = data.pagination;
    }
};

