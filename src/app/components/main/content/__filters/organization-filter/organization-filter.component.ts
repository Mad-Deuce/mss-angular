import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TreeSelectModule} from "primeng/treeselect";
import {FormsModule} from "@angular/forms";
import {OrganizationFilterService} from "./organization-filter.service";
import {TreeNodeSelectEvent} from "primeng/tree";

@Component({
  selector: 'app-organization-filter',
  standalone: true,
  imports: [
    TreeSelectModule,
    FormsModule
  ],
  providers: [OrganizationFilterService],
  templateUrl: './organization-filter.component.html',
  styleUrl: './organization-filter.component.scss'
})
export class OrganizationFilterComponent implements OnInit {
  nodes!: any[];
  selectedNodes: any;

  @Output() onChanged = new EventEmitter<TreeNodeSelectEvent>();
  @Output() onReset = new EventEmitter();

  constructor(private nodeService: OrganizationFilterService) {
  }

  ngOnInit(): void {
    this.nodeService.organizationSubject.subscribe(value => {
      this.nodes = value
    });
    this.nodeService.getOrganizationStructure();
  }

  onSelect($event: TreeNodeSelectEvent) {
    this.onChanged.emit($event);
  }

  onClear() {
    this.onReset.emit();
    console.log("node clear");
    console.log();
  }


}

