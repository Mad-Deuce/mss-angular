import {Component, Input, OnInit,} from '@angular/core';
import {Table, TableLazyLoadEvent, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {MiListMainDto, MiListMainService} from "./mi-list-main.service";
import {TabNode} from "../../../../services/tab-view.service";
import {OrganizationFilterComponent} from "../__filters/organization-filter/organization-filter.component";
import {TreeNodeSelectEvent} from "primeng/tree";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {ChipModule} from "primeng/chip";
import {NgForOf} from "@angular/common";
import {FilterMetadata} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {ListColumn, MiListColumnsService} from "./mi-list.columns.service";
import {ColumnFilterCustomComponent} from "../__filters/column-filter-custom/column-filter-custom.component";
import {FilterChip} from "../__filters/FilterChip";


@Component({
  selector: 'app-mi-list-main',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    OrganizationFilterComponent,
    ChipsModule,
    FormsModule,
    ChipModule,
    NgForOf,
    TooltipModule,
    ColumnFilterCustomComponent
  ],
  providers: [MiListMainService, MiListColumnsService],
  templateUrl: './mi-list-main.component.html',
  styleUrl: './mi-list-main.component.scss'
})
export class MiListMainComponent implements OnInit {

  @Input() tabNode!: TabNode;

  items!: MiListMainDto[];
  totalRecords: number = 0;
  rows: number = 25;

  cols!: ListColumn[];

  chips: FilterChip[] = [];
  filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; } = {};

  constructor(private miListMainService: MiListMainService, private columnsService: MiListColumnsService) {
  }

  ngOnInit() {
    this.miListMainService.contentSubject.subscribe(value => {
      this.items = value;
    })

    this.miListMainService.totalRecordsSubject.subscribe(value => {
      this.totalRecords = value;
    })

    this.cols = this.columnsService.getColumns(this.tabNode.template);
  }

  loadItems($event?: TableLazyLoadEvent) {
    this.miListMainService.getData(this.tabNode, this.filtersMetadata, $event,);
  }

  onLazyLoad($event: TableLazyLoadEvent,) {
    let keys: string[];
    if ($event.filters) {
      let filters = $event.filters;
      keys = Object.keys(filters);
      keys.forEach(key => {
        if (key != "ownerOrganizationId") {
          let evFilter: any = filters[key];
          if (evFilter[0].value) {
            let operator = evFilter[0].matchMode;
            let right = evFilter[0].value;
            let filter: FilterChip = new FilterChip(key, operator, right);
            this.chips = FilterChip.addChip(this.chips, filter);
          } else {
            this.chips = FilterChip.removeChipsByField(this.chips, key);
          }
        }

      })
    }

    this.loadItems($event);
  }

  onOrganizationFilterChanged($event: TreeNodeSelectEvent, dt: Table) {
    dt.filter($event.node.data, "ownerOrganizationId", "byRoot");
  }

  onOrganizationFilterReset(dt: Table) {
    dt.filter(null, "ownerOrganizationId", "byRoot");
  }

  onChipRemove(filter: FilterChip) {
    this.chips = FilterChip.removeChipsByField(this.chips, filter.field);

    if (this.filtersMetadata[filter.field]) {
      if (Array.isArray(this.filtersMetadata[filter.field])) {
        let arr: FilterMetadata[] = <FilterMetadata[]>this.filtersMetadata[filter.field];
        arr.forEach(value => value.value = null);
      } else {
        let s: FilterMetadata = <FilterMetadata>this.filtersMetadata[filter.field];
        s.value = null;
      }
    }
    this.loadItems();
  }

  onExportBtnClick() {
    this.miListMainService.exportData(this.tabNode, this.filtersMetadata);
  }
}



