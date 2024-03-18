import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TableLazyLoadEvent} from "primeng/table";
import {FilterMetadata} from "primeng/api";
import {TabNode} from "../../../services/tab-view.service";

@Injectable()
export class MiListMainService {

  serverBaseUrl: string = environment.baseUrl;

  contentSubject = new BehaviorSubject<MiListMainDto[]>([]);
  totalRecordsSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getData(tabNode: TabNode,
          filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; },
          event?: TableLazyLoadEvent,): void {

    let params = new HttpParams()
      .set("page", (event?.first && event.rows ? (event?.first / event.rows).toString() : ""))
      .set("size", (event?.rows ? event.rows.toString() : ""))
      .set("sort", (event?.sortField ? event.sortField + "," + (event.sortOrder === 1 ? "asc" : "desc") : ""))


    let left: string;
    let operator: string;
    let right: string;
    Object.keys(filtersMetadata).forEach((value) => {

      if (filtersMetadata[value]) {
        if (Array.isArray(filtersMetadata[value])) {
          let arr: FilterMetadata[] = <FilterMetadata[]>filtersMetadata[value];
          arr.forEach(item => {
            if (item.value) {
              left = value;
              operator = item.matchMode ? item.matchMode : "";
              right = "\'" + item.value + "\'";
              params = params.append("filter", (left + " " + operator + " " + right));
            }
          });
        } else {
          let s: FilterMetadata = <FilterMetadata>filtersMetadata[value];
          if (s.value) {
            left = value;
            operator = s.matchMode ? s.matchMode : "";
            right = "\'" + s.value + "\'";
            params = params.append("filter", (left + " " + operator + " " + right));
          }
        }
      }
    })

    let uri: string = (tabNode.template).replaceAll("_", "-");
    this.http.get<any>(this.serverBaseUrl + 'api/measuring-instruments/' + uri, {params})
      .subscribe(value => {
        this.contentSubject.next(value.content)
        this.totalRecordsSubject.next(value.totalElements)
      });
  }

  exportData(tabNode: TabNode,
             filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; }): void {

    let params = new HttpParams()

    let left: string;
    let right: string;
    Object.keys(filtersMetadata).forEach((value) => {
      if (filtersMetadata[value]) {
        if (Array.isArray(filtersMetadata[value])) {
          let arr: FilterMetadata[] = <FilterMetadata[]>filtersMetadata[value];
          arr.forEach(item => {
            if (item.value) {
              left = value;
              right = item.value ;
              if (left == "ownerOrganizationId") params = params.set("ownerOrganizationRootId", right);
            }
          });
        } else {
          let s: FilterMetadata = <FilterMetadata>filtersMetadata[value];
          if (s.value) {
            left = value;
            right =  s.value ;
            if (left == "ownerOrganizationId") params = params.set("ownerOrganizationRootId", right);
          }
        }
      }
    })

    let uri: string = (tabNode.template).replaceAll("_", "-");
    this.http.get(this.serverBaseUrl + 'api/measuring-instruments/export/' + uri, {
      params: params,
      responseType: 'arraybuffer'
    })
      .subscribe((response) => this.downLoadFile(response, "application/ms-excel", tabNode.tabHeader));
  }

  private downLoadFile(data: any, type: string, reportName: string) {
    let fileName = reportName + ".xlsx"
    let blob = new Blob([data], {type: type});
    let a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    a.click();
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

  static addChip(filters: FilterChip[], filter: FilterChip): FilterChip[] {
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

  static removeChipsByField(filters: FilterChip[], field: string): FilterChip[] {
    if (!filters && !field) return [];
    if (!field) return filters;
    if (!filters) return [];

    let tFilters: FilterChip[] = filters.filter(value => value.field == field)
    tFilters.forEach(() => {
      let i = filters.findIndex(value => value.field == field);
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
