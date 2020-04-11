import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ManageColumns} from './manage-columns';
import {ManageColumnsService} from '../../_services/manage-columns.service';
import {ITdDataTableColumn} from '@covalent/core';
import {iTableColumn} from '../../_models/table-list';

@Component({
    selector: 'app-manage-columns',
    templateUrl: 'manage-columns.component.html',
    styleUrls: ['manage-columns.component.css']
    // encapsulation: ViewEncapsulation.None
})
export class ManageColumnsComponent implements OnInit{
    columns = new FormControl();
    columnsList: iTableColumn[];
    manageColumns: ManageColumns = null;
    toggle: boolean = false;

    constructor(private manageColumnsService: ManageColumnsService) {
    }

    ngOnInit(): void {
        this.manageColumnsService.columnsAsObservable.subscribe((data: ManageColumns)=>{
            this.columnsList = data.getColumns();
            this.manageColumns = data;
            this.manageColumnsService.getSettings(data.entity).subscribe((data)=>{
              // hidden fields on grid
                let value = data && data['Settings'] || '';

                this.columnsList.filter((item)=>{
                  if (!value.length) {
                    item.hidden = false;
                  } else {
                    item.hidden =  (value.indexOf(item.name) >= 0) ? false : true
                  }
                })
            });
        })
    }

    onToogle() {
        setTimeout(()=>{
          this.toggle = !this.toggle;
          //when close popup
          if (!this.toggle && this.columnsList && this.columnsList.length) {
            let array: string[] = [];

            this.columnsList.filter((item)=>{
              if (!item.hidden) {
                array.push(item.name);
              }
            })
            this.manageColumnsService.setSettings(this.manageColumns.entity, array).subscribe((data)=>{});
          }
        }, 100)
    }

    onChange(item: iTableColumn) {
        let cell = item;

        cell.hidden = !item.hidden;
        this.manageColumnsService.setManageColumn(cell);
    }

    clickOut() {
      if (this.toggle) {
          this.onToogle();
      }
    }
}
