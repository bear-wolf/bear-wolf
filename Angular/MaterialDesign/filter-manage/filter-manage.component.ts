import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FilterDialogModel} from '../filter/filter-dialog-model';
import {FilterDialogComponent} from '../filter/filter-dialog.component';
import {FitlerManage} from './filter-manage-model';
import {FilterScheme} from '../../_services';
import {Subject} from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'filter-manage',
    styleUrls: ['filter-manage.component.css'],
    templateUrl: 'filter-manage.component.html',
    encapsulation: ViewEncapsulation.None
})

export class FilterManageComponent implements OnInit{
    dialogRef: MatDialogRef<FilterDialogComponent>;
    data: FilterScheme[] = null;
    isDirty: boolean = false;

    @Input('data') inputData: FitlerManage = null;

    constructor(private dialog: MatDialog){ }

    ngOnInit() {
      this.data = this.inputData.data;
    }

  onClearFilter() {
    this.inputData.data.forEach((x)=>{
        x.clear();
    })
    this.inputData.search.next({});
    this.inputData.afterClose.next({});
    this.isDirty = false;
  }

  openFilters(){
    let dialogModel = new FilterDialogModel({
      data: this.inputData.data,
      afterClose: new Subject()
    }).setParentClass(this.inputData.parentClass);

    this.dialogRef = this.dialog.open(FilterDialogComponent, {
      width: this.inputData.getWidth(),
      data: dialogModel,
    });

    dialogModel.afterCloseObservable.subscribe((data)=>{
      //if data exitst so set status of filter = true
      if (Object.keys(data).length) {
        this.isDirty = true;
      }

      this.inputData.afterClose.next(data);
      this.dialogRef = null;
    })
  }
}
