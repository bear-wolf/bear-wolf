import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-activity-drugs-select',
  templateUrl: './activity-drugs-select.component.html',
  styleUrls: ['./activity-drugs-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityDrugsSelectComponent implements OnInit {
  @Input() itemsList: any[];
  @Input() bindLabel: string = 'name';
  @Output() itemSelected = new EventEmitter<any>();
  selectedItem: any;

  constructor() { }

  ngOnInit() {
    this.selectItem(this.itemsList[0]);
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  isItemSelected(item: any): boolean {
    if (!this.selectedItem) {
      return false;
    }

    return item === this.selectedItem;
  }
}
