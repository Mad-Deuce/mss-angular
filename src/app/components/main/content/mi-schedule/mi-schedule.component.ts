import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {MultiFilterComponent} from "../__filters/multi-filter/multi-filter.component";
import {NgForOf} from "@angular/common";
import {OrganizationFilterComponent} from "../__filters/organization-filter/organization-filter.component";
import {FilterMetadata, SharedModule} from "primeng/api";
import {Table, TableLazyLoadEvent, TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {TabNode} from "../../../../services/tab-view.service";
import {FilterChip} from "../__filters/FilterChip";
import {TreeNodeSelectEvent} from "primeng/tree";
import {MiScheduleDto, MiScheduleService} from "./mi-schedule.service";
import {Column, ColumnsService} from "./mi-schedule.columns.service";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mi-schedule',
  standalone: true,
  imports: [
    ButtonModule,
    ChipModule,
    MultiFilterComponent,
    NgForOf,
    OrganizationFilterComponent,
    SharedModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    FormsModule
  ],
  providers: [MiScheduleService, ColumnsService],
  templateUrl: './mi-schedule.component.html',
  styleUrl: './mi-schedule.component.scss'
})
export class MiScheduleComponent implements OnInit {

  @Input() tabNode!: TabNode;

  date: Date = new Date();

  items!: MiScheduleDto[];
  totalRecords: number = 0;
  rows: number = 25;

  cols!: Column[];

  chips: FilterChip[] = [];
  filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; } = {};

  constructor(private miScheduleService: MiScheduleService, private columnsService: ColumnsService) {
  }


  ngOnInit() {
    this.miScheduleService.contentSubject.subscribe(value => {
      this.items = value;
    })

    this.miScheduleService.totalRecordsSubject.subscribe(value => {
      this.totalRecords = value;
    })

    this.cols = this.columnsService.getColumns(this.tabNode.template);

    this.filtersMetadata = {year: [{value: this.date.getFullYear(), matchMode: "~", operator: "and"}]};
  }

  loadItems($event?: TableLazyLoadEvent) {
    this.miScheduleService.getData(this.tabNode, this.filtersMetadata, $event,);
  }

  onLazyLoad($event: TableLazyLoadEvent,) {
    let keys: string[];
    if ($event.filters) {
      let filters = $event.filters;
      keys = Object.keys(filters);
      keys.forEach(key => {
        if (key != "ownerOrganizationId" && key != "year") {
          let evFilter: any = filters[key];
          if (evFilter[0].value) {
            let operator = evFilter[0].matchMode;
            let right = evFilter[0].value;
            let filter: FilterChip = new FilterChip(key, operator, right);
            if (key != "ownerOrganizationId" && key != "year") this.chips = FilterChip.addChip(this.chips, filter);
          } else {
            this.chips = FilterChip.removeChipsByField(this.chips, key);
          }
        }


      })
    }

    this.loadItems($event);
  }

  onMaintenanceOrganizationFilterChanged($event: TreeNodeSelectEvent, dt: Table) {
    dt.filter($event.node.data, "maintenanceOrganizationId", "~");
  }

  onMaintenanceOrganizationFilterReset(dt: Table) {
    dt.filter(null, "maintenanceOrganizationId", "~");
  }

  onOwnerOrganizationFilterChanged($event: TreeNodeSelectEvent, dt: Table) {
    dt.filter($event.node.data, "ownerOrganizationId", "~");
  }

  onOwnerOrganizationFilterReset(dt: Table) {
    dt.filter(null, "ownerOrganizationId", "~");
  }

  onYearChange(event: Date, dt: Table) {
    dt.filter(event.getFullYear(), "year", "~");
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
    this.miScheduleService.exportData(this.tabNode, this.filtersMetadata);
  }


}
