import {Component, Input, OnInit} from '@angular/core';
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {OptionsService} from "./options.service";

@Component({
  selector: 'app-multi-filter',
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
  templateUrl: './multi-filter.component.html',
  styleUrl: './multi-filter.component.scss'
})
export class MultiFilterComponent implements OnInit {

  @Input() type: string = "text";
  @Input() field!: string;
  @Input() matchMode: string = "~"
  multiSelectOptions: string[] = [];

  constructor(private optionsService: OptionsService) {
  }

  ngOnInit(): void {
    this.optionsService.optionsSubject.subscribe(value => this.multiSelectOptions = value);
    this.optionsService.getOptions(this.field);
  }


}
