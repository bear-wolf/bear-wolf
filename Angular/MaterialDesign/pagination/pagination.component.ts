import {Component, Input, OnInit} from '@angular/core';
import {iData, PaginationService} from '../../_services/pagination.service';
import {iPaginationData} from '../../_interface/pagination.interface';
import {Pagination} from '../../_models/pagination';
import {Configuration} from '../../_models/config';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css'],
})
export class PaginationComponent implements OnInit{
    pager: iData;
    config: any = null;
    perPage: number;
    private data: iPaginationData;

    @Input('init') model: Pagination = null;

    constructor(private paginationService: PaginationService) {
        this.config = Configuration.pagination;
    }

    ngOnInit(){
        if (this.model) {
            this.perPage = this.paginationService.getPerPage();

            this.model.setPerPage(this.perPage);

            this.paginationService
              .setPerPage(this.perPage)
              .saveCountSelect();

            this.model.subjectPaginationData.subscribe((pager: iPaginationAll)=>{
                this.data = pager;
                this.pager = this.paginationService.getPager(pager.TotalRecords, pager.CurrentPage, pager.PerPage);

                // if (pager.TotalRecords <= pager.PerPage) {
                //     this.pager = null;
                // }
            })
        }
    }

    onSelect(count:number){
      this.model.setPerPage(count);
      this.paginationService
        .setPerPage(count)
        .saveCountSelect();

      this.paginationService.setPage(this.pager.currentPage);
    }

    setPage(page: number) {
        if (page == 0 || this.pager.totalPages < page || (this.pager.totalPages == page && this.pager.currentPage == page)) {
            return;
        }

        if (this.pager.currentPage != page) {
            this.paginationService.setPage(page);
        }
    }
}

export interface iPaginationAll extends iPaginationData{
    OrderByField: string;
    OrderDirection: string;
}
