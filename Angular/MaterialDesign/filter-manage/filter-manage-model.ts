import {Subject} from 'rxjs/Subject';
import {FilterScheme} from '../../_services';

export class FitlerManage{
  data: FilterScheme[];
  afterCloseObservable = null;
  parentClass: string;

  afterClose: Subject<any>;
  searchObservable:any = null;
  search: Subject<any>;

  private width: string;

  constructor() {
    this.afterClose = new Subject();
    this.search = new Subject();
    this.afterCloseObservable = this.afterClose.asObservable();
    this.searchObservable = this.search.asObservable();
  }

  setData(data: FilterScheme[]){
    this.data = data;

    return this;
  }

  setParentClass(name:string){
    this.parentClass = name;

    return this
  }

  // setSignal(signal: FilterSignal) {
  //   this.signal.next(signal);
  //
  //   return this;
  // }

  setWidth(width: string){
    this.width = width;

    return this;
  }

  getWidth(): string{
    return this.width;
  }

  finishDialog() {

  }
}


// export enum FilterSignal {
//   CLEAR,
// }
