import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TableLazyLoadEvent} from "primeng/table";

@Injectable()
export class MiListMainService {

  serverBaseUrl: string = environment.baseUrl;

  contentSubject = new BehaviorSubject<MiListMainDto[]>([]);
  totalRecordsSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getDataAlt(filters: Filter[], event?: TableLazyLoadEvent,): void {

    let params = new HttpParams()
      .set("page", (event?.first && event.rows ? (event?.first / event.rows).toString() : ""))
      .set("size", (event?.rows ? event.rows.toString() : ""))
      .set("sort", (event?.sortField ? event.sortField + "," + (event.sortOrder === 1 ? "asc" : "desc") : ""))

    filters.forEach(item => {
      params = params.set("filter", (item.left + " " + item.operator + " " + item.right));
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

export class Filter {
  left: string = "";
  operator: string = "";
  right: string = "";

  constructor(left: string | undefined, operator: string | undefined, right: string | undefined) {
    this.left = left != undefined ? left : "";
    this.operator = operator != undefined ? operator : "";
    this.right = right != undefined ? right : "";
  }

  static addFilter(filters: Filter[], filter: Filter): Filter[] {
    if (!filters && !filter) return [];
    if (!filter) return filters;
    if (!filters) return new Array(filter);

    let tItem: Filter | undefined = filters.find(item => {
      return item.left == filter.left && item.operator == filter.operator && item.right == filter.right;
    })
    if (!tItem) {
      filters.push(new Filter(filter.left, filter.operator, filter.right));
    }

    return filters;
  }

  static removeFilterByLeft(filters: Filter[], left: string): Filter[] {
    if (!filters && !left) return [];
    if (!left) return filters;
    if (!filters) return [];

    let tFilters: Filter[] = filters.filter(value => value.left == left)
    tFilters.forEach(() => {
      let i = filters.findIndex(value => value.left == left);
      filters.splice(i, 1);
    })

    return filters;
  }

  static getRightValues(filters: Filter[]): string[] {
    let result: string[] = [];
    filters.forEach(value => result.push(value.right))
    return result;
  }
}
