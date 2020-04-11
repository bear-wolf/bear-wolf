import {SkuBrand} from '@shared/models/sku-brand.model';

export class VolumeAgreementSkuBlock {
    skuBlockName: string;
    skuId: number;
    individualAccounting: boolean = false;
    skuBrand: SkuBrand[];

    constructor(data) {

    }
}
