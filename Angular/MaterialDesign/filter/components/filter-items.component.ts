import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {MatDatepickerInputEvent} from '@angular/material/typings/esm5/datepicker';
import {FilterScheme} from '../../../_services';
import {TypeSchemeData} from '../../../_models/scheme-data';
import * as moment from 'moment';
import {Configuration, iConfigFilter, iConfigLocale} from '../../../_models/config';
import {Moment} from 'moment';

@Component({
    selector: 'filter-items',
    styleUrls: ['filter-items.component.css'],
    templateUrl: 'filter-items.component.html',
    providers: [],
})
export class FilterItemsComponent implements OnInit{
    value: Moment;
    typeFilterScheme = TypeSchemeData;
    submit: boolean = false;
    locale: iConfigFilter;

    @Input('data') list: FilterScheme[] = null;
    @Output('command') command: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.locale = Configuration.filter;
    }

    onChange(date:any) {
    }

    onBlur(element: FilterScheme) {
        if (element.calculation){
            if (element.value != null) {
                element.calculation.calculation(Number(element.value));
            } else {
                element.calculation.value = null;
            }
        }
    }

    onClear(element: FilterScheme) {
        element.date = null;
    }

    onEnter() {
        this.command.emit(true);
    }

    ngOnInit(): void {
        let tabIndex = 3;
        this.list.forEach((item)=>{
            item.tabindex = ++tabIndex;
            switch(item.name) {
                case 'DT':
                case 'DTProcessed': {
                    item.date = { start: moment().add(-1, 'months'), end: moment() }
                    break;
                }
                default: { break}
            }
        })
    }
}
