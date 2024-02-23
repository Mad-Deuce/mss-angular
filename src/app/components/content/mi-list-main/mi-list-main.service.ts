import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PageableDto} from "../../../dtos/pageable.dto";

@Injectable()
export class MiListMainService {

  serverBaseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getData(pageable: PageableDto): Observable<any> {
    const params = new HttpParams()
      .set("page", (pageable?.pageNumber ? pageable.pageNumber .toString() : ""))
      .set("size", (pageable?.pageSize ? pageable.pageSize.toString() : ""))
      .set("sort", (pageable?.sort ? pageable.sort.sortField + "," + pageable.sort.sortOrder : ""))
    return this.http.get<any>(this.serverBaseUrl + 'api/measuring-instruments/list-main', {params});
  }
}

export class MiListMainDto {
  id!: number;
  measType: string | undefined;
  type: string | undefined;
  name: string | undefined;
  manufacturer: string | undefined;
  number: string | undefined;
  measAccuracy: string | undefined;
  measRange: string | undefined;
  locate: string | undefined;
  testOrg: string | undefined;
  testType: string | undefined;
  comment: string | undefined;
}

