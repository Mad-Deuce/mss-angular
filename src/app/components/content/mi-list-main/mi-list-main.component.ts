import {Component, Input, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {MiListMainDto, MiListMainService} from "./mi-list-main.service";
import {TabNode} from "../../../services/tab-view.service";


@Component({
  selector: 'app-mi-list-main',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule
  ],
  providers: [MiListMainService],
  templateUrl: './mi-list-main.component.html',
  styleUrl: './mi-list-main.component.scss'
})
export class MiListMainComponent implements OnInit {

  @Input() tabNode!: TabNode;

  items!: MiListMainDto[];
  totalRecords: number = 0;
  rows: number = 25;

  constructor(private miListMainService: MiListMainService) {
  }

  ngOnInit() {
    this.miListMainService.contentSubject.subscribe(value => {
      this.items = value;
    })
    this.miListMainService.totalRecordsSubject.subscribe(value => {
      this.totalRecords = value;
    })

  }

  loadItems($event: TableLazyLoadEvent) {
    this.miListMainService.getDataAlt($event);
  }
}


