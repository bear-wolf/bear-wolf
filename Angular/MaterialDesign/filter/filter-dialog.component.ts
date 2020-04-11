import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';

import {EntityScheme, FilterScheme} from '../../_services';
import {TypeSchemeData} from '../../_models/scheme-data';
import {Configuration} from '../../_models/config';
import {FitlerManage} from '../filter-manage/filter-manage-model';
import * as moment from 'moment';

@Component({
    selector: 'filter-dialog',
    styleUrls: ['filter-dialog.component.css'],
    templateUrl: 'filter-dialog.component.html',
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class FilterDialogComponent implements OnChanges, OnInit{
    submit = false;
    list: FilterScheme[] = null;
    anotherField: FilterScheme[] = null;
    onlyValue: FilterScheme[] = null;

    panelFilter1 = false;
    parentClass = '';

    @Input('data') scheme: FitlerManage;
    @ViewChild("searchBtn") searchBtn;

    constructor() {
    }

    ngOnInit(): void {
        this.changeTabIndex();
    }

    changeTab($event) {
        setTimeout(this.searchBtn._elementRef.nativeElement ? this.searchBtn._elementRef.nativeElement.focus() : '', 50);
        this.changeTabIndex();
        this.panelFilter1 = ($event.index == 0) ? true : false;
    }

    private changeTabIndex() {
        this.anotherField = FilterScheme.setTabIndexToArray(this.anotherField);
        this.onlyValue = FilterScheme.setTabIndexToArray(this.onlyValue);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.scheme.currentValue) {
            this.list = changes.scheme.currentValue.data;
            this.anotherField = this.list.filter((x)=>{ return x.type != TypeSchemeData.TypeValue ? x : null;});
            this.onlyValue = this.getFieldValue();
            this.onClearFilterClick();

            this.panelFilter1 = (this.onlyValue && this.onlyValue.length) ? true : false;

            setTimeout(this.searchBtn.nativeElement ? this.searchBtn.nativeElement.focus() : '')
        }
    }

    onSearch(): void {
        let json = {};
        let array: FilterScheme[];

        this.submit = true;
        if (!this.isValidate()) {
            return;
        }
        array = (this.panelFilter1) ? this.onlyValue : this.anotherField;

        array.filter((x)=>{
          if (x.value) {
            json[x.name] = x.value;

            if (x.type == TypeSchemeData.TypeSelect && x.optionsKey == 'id') {
              json[x.name] = Number.isNaN(Number(x.value)) ? x.value : Number(x.value);
            }
          } else {
            if (x.type == TypeSchemeData.TypeCalendar && x.date) {
                if (x.date_range && (x.date.start || x.date.end)) {
                    if (x.date.start) {
                        json[x.name+'From'] = x.date.start.format(Configuration.locale.format_short_date)+'T00:00:00.000';
                    }
                    if (x.date.end) {
                        json[x.name+'To'] = x.date.end.format(Configuration.locale.format_short_date)+ 'T23:59:59.999';
                    }
                } else {
                    if (x.date.start) {
                        json[x.name] = x.date.start.format(Configuration.locale.format_short_date)+'T00:00:00.000';
                    }
                }
            }
          }

            if (x.calculation && x.calculation.value != null) {
                x.calculation.calculation(Number(x.value));

                json[x.name] = (x.convertToString) ? x.calculation.value.toString() : x.calculation.value;
            }

        });

        if (!Object.keys(json).length && (array && array.length)) {
            if (array[0].entity == EntityScheme.Fill) {
                array.filter((item)=>{
                    switch(item.name) {
                        case 'DTProcessed': {
                            json[item.name+'From'] = moment().add(-1, 'months').format(Configuration.locale.format_short_date)+'T00:00:00.000';
                            json[item.name+'To'] = moment().format(Configuration.locale.format_short_date)+ 'T23:59:59.999';

                            item.date = { start: moment().add(-1, 'months'), end: moment() }
                            break;
                        }
                        default: { break}
                    }
                });
            }
            if (array[0].entity == EntityScheme.Deals) {
                array.filter((item)=>{
                    switch(item.name) {
                        case 'DT': {
                            json[item.name+'From'] = moment().add(-1, 'months').format(Configuration.locale.format_short_date)+'T00:00:00.000';
                            json[item.name+'To'] = moment().format(Configuration.locale.format_short_date)+ 'T23:59:59.999';

                            item.date = { start: moment().add(-1, 'months'), end: moment() }
                            break;
                        }
                        default: { break}
                    }
                });
            }
        }

        //clear empty value
        if (json) {
            if (json['Status'] == -1) {
                delete json['Status'];
            }
            if (json['Statuses'] == -1) {
                delete json['Statuses'];
            }
            if (json['State'] == -1) {
                delete json['State'];
            }
            if (json['Type'] == -1) {
                delete json['Type'];
            }
        }

        this.scheme.search.next(json);
    }

    private isValidate(){
        let r = true;
        let array;

        if (this.isFieldValue()) {
          array = this.getFieldValue();
        } else {
          array = this.list;
        }

        array.filter((x)=>{
            if (x.required) {
                if (x.value == null) {
                    r = false;
                    x.error = true;
                    return false;
                }
            }
            if (x.validation && x.value) {
              let json = x.validation(new FormControl(x.value));

              if (Object.keys(json || {}).length) {
                x.error = true;
                x.message = json[Object.keys(json)[0]];
                r = false;
              }
            }
        });

        return r;
    }

    isFieldValue(){
      if (!this.list) {
          return false;
      }
      return this.list.filter((x)=>{ return x.type == TypeSchemeData.TypeValue ? x : null;}).length ? true : false;
    }

    getFieldValue(): FilterScheme[] {
      return this.list.filter((x)=>{ return x.type == TypeSchemeData.TypeValue ? x : null;});
    }

    onClearFilterClick() {
        this.anotherField.forEach((x)=>{
            x.clear();
        })
        this.onlyValue.forEach((x)=>{
            x.clear();
        })

        this.submit = false;
        this.changeTabIndex();
    }
}
