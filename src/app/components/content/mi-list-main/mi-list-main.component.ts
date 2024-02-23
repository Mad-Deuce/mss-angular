import {Component, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {MiListMainDto, MiListMainService} from "./mi-list-main.service";
import {PageDto} from "../../../dtos/page.dto";
import {PageableDto} from "../../../dtos/pageable.dto";

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
  items!: MiListMainDto[];
  page: PageDto = new PageDto();
  pageable: PageableDto = new PageableDto();

  constructor(private miListMainService: MiListMainService) {
  }

  ngOnInit() {
    this.miListMainService.getData(this.pageable).subscribe((value) => {
      this.items = value.content
      this.page.last = value.last;
      this.page.totalPages = value.totalPages;
      this.page.totalElements = value.totalElements;
      this.page.size = value.size;
      this.page.number = value.number;
      this.page.numberOfElements = value.numberOfElements;
      this.page.first = value.first;
      this.page.empty = value.empty;
    });
  }

  loadItems($event: TableLazyLoadEvent) {

  }
}


