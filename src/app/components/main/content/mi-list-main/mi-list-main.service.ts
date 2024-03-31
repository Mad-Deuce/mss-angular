import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {TableLazyLoadEvent} from "primeng/table";
import {FilterMetadata} from "primeng/api";
import {TabNode} from "../../../../services/tab-view.service";
import {FilterMetaDataUtils} from "../__filters/FilterMetaDataUtils";

@Injectable()
export class MiListMainService {

  serverBaseUrl: string = environment.baseUrl;

  contentSubject = new BehaviorSubject<MiListMainDto[]>([]);
  totalRecordsSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getData(tabNode: TabNode,
          filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; },
          event?: TableLazyLoadEvent): void {

    let params = new HttpParams()
      .set("page", (event?.first && event.rows ? (event?.first / event.rows).toString() : ""))
      .set("size", (event?.rows ? event.rows.toString() : ""))
      .set("sort", (event?.sortField ? event.sortField + "," + (event.sortOrder === 1 ? "asc" : "desc") : ""))

    params = FilterMetaDataUtils.setParams(params, filtersMetadata);

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
              right = item.value;
              if (left == "ownerOrganizationId") params = params.set("ownerOrganizationRootId", right);
            }
          });
        } else {
          let s: FilterMetadata = <FilterMetadata>filtersMetadata[value];
          if (s.value) {
            left = value;
            right = s.value;
            if (left == "ownerOrganizationId") params = params.set("ownerOrganizationRootId", right);
          }
        }
      }
    })

    let uri: string = (tabNode.template).replaceAll("_", "-");
    this.http.get(this.serverBaseUrl + 'api/measuring-instruments/' + uri + '/export', {
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

