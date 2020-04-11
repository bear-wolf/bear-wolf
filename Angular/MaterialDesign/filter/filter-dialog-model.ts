import {DialogModel, iDialogModel} from '../../dialogs/dialog-model';
import {FilterScheme} from '../../_services';

export interface iFilterDialogModel extends iDialogModel{
    data: FilterScheme[];
}

export class FilterDialogModel extends DialogModel{
    data: FilterScheme[];
    parentClass = '';

    constructor (data: iFilterDialogModel) {
        super(data);

        this.data = data.data;
    }

    setParentClass(name: string){
        this.parentClass = name;

        return this;
    }
}