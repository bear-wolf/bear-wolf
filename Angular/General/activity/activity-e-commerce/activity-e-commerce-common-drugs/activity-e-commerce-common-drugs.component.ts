import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonInner} from '@shared/components/common-inner.component';
import {ECommerce} from '../e-commerce.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '@shared/services/data.service';
import {SkuBrand} from '@shared/models/sku-brand.model';
import {SkuService} from '@shared/services/sku.service';
import {Sku} from '@shared/models/sku.model';
import {ECommerceSku} from '../e-commerce-sku.model';
import {CurrencyService} from '@shared/components/currency/currency.service';

@Component({
    selector: 'app-activity-e-commerce-common-drugs',
    templateUrl: './activity-e-commerce-common-drugs.component.html',
    styleUrls: ['./activity-e-commerce-common-drugs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityECommerceCommonDrugsComponent extends CommonInner implements OnInit {
    @Input()
    eCommerce: ECommerce;

    brands: SkuBrand[];
    brandSkus: Sku[];
    filteredSkuList: Sku[] = [];

    constructor(
        public fb: FormBuilder,
        public dataService: DataService,
        public skuService: SkuService,
        public currencyService: CurrencyService
    ) {
        super(fb);
    }

    ngOnInit(): void {
        super.ngOnInit(this.eCommerce);

        this.getAllBrands();
    }

    setFillForm(item) {
        if (this.form && item) {
            this.form.get('eCommerceSkus').setValue(this.listSKU);
        }
    }

    getAllBrands() {
        this.skuService.getAllBrands().subscribe((brands) => {
            this.brands = brands;

            this.buildForm({});

            const brand = this.form.get('brand').value;

            if (brand) {
                this.getBrandSkus(brand.name);
            }

            this.form.get('brand').valueChanges.subscribe((brand: SkuBrand) => {
                this.eCommerce.eCommerceSkus = [];
                this.form.get('eCommerceSkus').setValue([]);
                this.getBrandSkus(brand.name);
            });
        });
    }

    buildForm(properties): FormGroup {

        return super.buildForm({
            brand: [this.getBrandById(), Validators.required],
            eCommerceSkus: [this.listSKU]
        });
    }

    get listSKU(): Sku[] {
        return (this.eCommerce.eCommerceSkus || []).map(item => item.sku);
    }


    getBrandById(): SkuBrand {
        if (!this.eCommerce.brandId) {
            return null;
        }
        return this.brands.filter(b => b.id === this.eCommerce.brandId)[0];
    }

    getBrandSkus(brandName: string) {
        this.skuService.getSkuByBrandName(brandName).subscribe((skus) => {
            this.brandSkus = skus;
        });
    }

    searchSku(event) {
        this.skuService.getSkuByName(event.query).subscribe((skuList: Sku[]) => {
            this.filteredSkuList = skuList;
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.validation()) {
            return;
        }

        const data = this.form.getRawValue();

        if (data.brand) {
            this.eCommerce.brandId = data.brand.id;

            const newECommerceSku: any[] = [];

            (data.eCommerceSkus || []).forEach((sku: Sku) => {
                const json: any = {
                    eCommerceId: this.eCommerce.id || 0,
                    sku: sku,
                    skuId: sku.id
                };

                const eCommerceSku = this.eCommerce.eCommerceSkus.filter(item => item.skuId === sku.id);
                if (eCommerceSku.length) {
                    newECommerceSku.push(eCommerceSku[0]);
                } else {
                    newECommerceSku.push(new ECommerceSku(this.currencyService, json));
                }
            });
            this.eCommerce.eCommerceSkus = newECommerceSku;

        }
    }
}
