import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TabNode} from "../../../../services/tab-view.service";
import {FilterMetadata} from "primeng/api";
import {TableLazyLoadEvent} from "primeng/table";
import {FilterMetaDataUtils} from "../__filters/FilterMetaDataUtils";

@Injectable()
export class MiScheduleService {
  serverBaseUrl: string = environment.baseUrl;

  contentSubject = new BehaviorSubject<MiScheduleDto[]>([]);
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

    let params = FilterMetaDataUtils.setParams(new HttpParams(), filtersMetadata);

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

export class MiScheduleDto {
  id!: number;

  ownerOrganizationId: number | undefined;
  maintenanceOrganizationId: number | undefined;
  maintenanceTypeId: number | undefined;

  measurementType: string | undefined;
  maintenanceTypeName: string | undefined;
  name: string | undefined;
  month: number | undefined;
  year: number | undefined;
  numbers: string[] | undefined;
  dates: string[] | undefined;

  totalCount: number | undefined;
  month01Count: number | undefined;
  month02Count: number | undefined;
  month03Count: number | undefined;
  month04Count: number | undefined;
  month05Count: number | undefined;
  month06Count: number | undefined;
  month07Count: number | undefined;
  month08Count: number | undefined;
  month09Count: number | undefined;
  month10Count: number | undefined;
  month11Count: number | undefined;
  month12Count: number | undefined;
}
