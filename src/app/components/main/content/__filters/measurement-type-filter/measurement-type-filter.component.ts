import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {OptionsService} from "./options.service";
import {MultiSelectChangeEvent, MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-measurement-type-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule
  ],
  providers: [OptionsService],
  templateUrl: './measurement-type-filter.component.html',
  styleUrl: './measurement-type-filter.component.scss'
})
export class MeasurementTypeFilterComponent implements OnInit {

  options: string[] = [];
  selectedValue: string | undefined;

  @Input() placeholder: string = "";

  @Output() onChanged = new EventEmitter<MultiSelectChangeEvent>();
  @Output() onReset = new EventEmitter();


  constructor(private service: OptionsService) {
  }

  ngOnInit(): void {
    this.service.optionsSubject.subscribe(value => {
      this.options = value
    });
    this.service.getOptions("measurementType");
  }

  onSelect($event: MultiSelectChangeEvent) {
    this.onChanged.emit($event);
  }

  onClear() {
    this.onReset.emit();
  }

}
