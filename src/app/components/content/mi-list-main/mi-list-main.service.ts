import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TableLazyLoadEvent} from "primeng/table";
import {FilterMetadata} from "primeng/api";

@Injectable()
export class MiListMainService {

  serverBaseUrl: string = environment.baseUrl;

  contentSubject = new BehaviorSubject<MiListMainDto[]>([]);
  totalRecordsSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getDataAlt(filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; }, event?: TableLazyLoadEvent,): void {

    let params = new HttpParams()
      .set("page", (event?.first && event.rows ? (event?.first / event.rows).toString() : ""))
      .set("size", (event?.rows ? event.rows.toString() : ""))
      .set("sort", (event?.sortField ? event.sortField + "," + (event.sortOrder === 1 ? "asc" : "desc") : ""))

    Object.keys(filtersMetadata).forEach((value) => {

      // @ts-ignore
      if (filtersMetadata[value][0].value) {
        let left: string = value;

        // @ts-ignore
        let operator: string = filtersMetadata[value][0].matchMode;

        // @ts-ignore
        let right: string = "\'" + filtersMetadata[value][0].value + "\'";

        params = params.set("filter", (left + " " + operator + " " + right));
      }

    })

    this.http.get<any>(this.serverBaseUrl + 'api/measuring-instruments/list-main', {params})
      .subscribe(value => {
        this.contentSubject.next(value.content)
        this.totalRecordsSubject.next(value.totalElements)
      });
  }
}


export class MiListMainDto {
  id!: number;
  measurementType: string | undefined;
  type: string | undefined;
  name: string | undefined;
  manufacturer: string | undefined;
  number: string | undefined;
  measurementAccuracy: string | undefined;
  measurementRange: string | undefined;
  locate: string | undefined;
  maintenanceOrganization: string | undefined;
  maintenanceType: string | undefined;
  comment: string | undefined;
}

export class FilterChip {
  field: string = "";
  operator: string = "";
  value: string = "";

  constructor(left: string | undefined, operator: string | undefined, right: string | undefined) {
    this.field = left != undefined ? left : "";
    this.operator = operator != undefined ? operator : "";
    this.value = right != undefined ? right : "";
  }

  static addFilter(filters: FilterChip[], filter: FilterChip): FilterChip[] {
    if (!filters && !filter) return [];
    if (!filter) return filters;
    if (!filters) return new Array(filter);

    let tItem: FilterChip | undefined = filters.find(item => {
      return item.field == filter.field && item.operator == filter.operator && item.value == filter.value;
    })
    if (!tItem) {
      filters.push(new FilterChip(filter.field, filter.operator, filter.value));
    }

    return filters;
  }

  static removeFilterByLeft(filters: FilterChip[], left: string): FilterChip[] {
    if (!filters && !left) return [];
    if (!left) return filters;
    if (!filters) return [];

    let tFilters: FilterChip[] = filters.filter(value => value.field == left)
    tFilters.forEach(() => {
      let i = filters.findIndex(value => value.field == left);
      filters.splice(i, 1);
    })

    return filters;
  }

  static getRightValues(filters: FilterChip[]): string[] {
    let result: string[] = [];
    filters.forEach(value => result.push(value.value))
    return result;
  }
}
