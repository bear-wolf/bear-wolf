import { Component, Input, OnInit } from '@angular/core';
import { Dma } from '../dma.model';
import { CommonInner } from '@shared/components/common-inner.component';
import { FormBuilder } from '@angular/forms';
import { iOption } from '@shared/models/option.model';
import { enumToList } from '@shared/functions/enumToList';
import { DmaShowDataEnum } from '../activity-dma-stock-economics/dma-show-data.enum';
import {DocumentType} from '@shared/components/document/document-type.model';

@Component({
  selector: 'app-activity-dma-documents',
  templateUrl: './activity-dma-documents.component.html',
  styleUrls: ['./activity-dma-documents.component.scss']
})
export class ActivityDmaDocumentsComponent extends CommonInner implements OnInit {
  @Input() dma: Dma;

  constructor(
    public fb: FormBuilder
  ) {
    super(fb);
  }

}
