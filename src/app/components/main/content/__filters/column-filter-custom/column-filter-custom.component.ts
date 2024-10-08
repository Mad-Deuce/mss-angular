import {Component, Input, OnInit} from '@angular/core';
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {OptionsService} from "./options.service";

@Component({
  selector: 'app-column-filter-custom',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule,
    TableModule,
    NgSwitch,
    NgTemplateOutlet,
    NgSwitchCase,
    DropdownModule,
    CheckboxModule,
    NgForOf,
    NgSwitchDefault
  ],
  providers: [OptionsService],
  templateUrl: './column-filter-custom.component.html',
  styleUrl: './column-filter-custom.component.scss'
})
export class ColumnFilterCustomComponent implements OnInit {

  @Input() type: string = "text";
  @Input() field!: string;
  @Input() matchMode: string = "~"
  selectOptions: string[] = [];

  constructor(private optionsService: OptionsService) {
  }

  ngOnInit(): void {
    this.optionsService.optionsSubject.subscribe(value => this.selectOptions = value);
    if (this.matchMode == "in") this.optionsService.getOptions(this.field);
  }


}
