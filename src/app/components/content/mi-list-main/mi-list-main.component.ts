import {Component,  Input, OnInit, } from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Filter, MiListMainDto, MiListMainService} from "./mi-list-main.service";
import {TabNode} from "../../../services/tab-view.service";
import {OrganizationFilterComponent} from "../../temp/organization-filter/organization-filter.component";
import {TreeNodeSelectEvent} from "primeng/tree";


@Component({
  selector: 'app-mi-list-main',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    OrganizationFilterComponent
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
  filters: Filter[] = [];

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

  loadItems(filters: Filter[], $event?: TableLazyLoadEvent) {
    this.miListMainService.getDataAlt(filters, $event,);
  }

  onLazyLoad($event: TableLazyLoadEvent,) {
    this.loadItems(this.filters, $event);
  }

  onOrganizationFilterChanged($event: TreeNodeSelectEvent) {
    let filter: Filter = new Filter("ownerOrganizationId", "byRoot", $event.node.data);
    this.filters = Filter.addFilter(this.filters, filter);
    this.loadItems(this.filters);
  }
}


