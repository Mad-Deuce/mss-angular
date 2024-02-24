import {TableLazyLoadEvent} from "primeng/table";

export class PageableDto {



  page: string = "";
  size: string = "";

  sortField: string = "";
  sortOrder: string = "asc";

  constructor(event: TableLazyLoadEvent) {
    this.page = (event?.first && event.rows ? (event?.first / event.rows).toString() : "")
    this.size
  }
}
