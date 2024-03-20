import {Component, Input} from '@angular/core';
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";

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
  templateUrl: './multi-filter.component.html',
  styleUrl: './multi-filter.component.scss'
})
export class MultiFilterComponent {

  @Input() type: string = "text";
  @Input() field!: string;
  @Input() matchMode: string = "~"
  @Input() multiSelectOptions: string[] = ["1", "2", "3", "4", "5", "6", '7'];

}
