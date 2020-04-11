import {EntityScheme} from '../../_services';
import {ITdDataTableColumn} from '@covalent/core';
import {iTableColumn} from '../../_models/table-list';

export class ManageColumns {
    key: EntityScheme;
    data: {};
    private columns: iTableColumn[];
    entity: EntityScheme;

    constructor(columns: iTableColumn[], entity: EntityScheme){
        this.columns = columns;
        this.entity = entity;
    }

    setKey(key: EntityScheme) {
        this.key = key;

        return this;
    }

    setData(data:any) {
        this.data = data;

        return this;
    }

    // setColumns(columns: ITdDataTableColumn[]) {
    //     this.columns = columns;
    //
    //     return this;
    // }

    getColumns() {
        return this.columns;
    }
}
