import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, } from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()
export class OrganizationFilterService {

  serverBaseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  organizationSubject = new BehaviorSubject<any[]>([]);

  getOrganizationStructure() {
    this.http.get<any>(this.serverBaseUrl + 'api/org/structure', {})
      .subscribe(response => {
        let t = [];
        t.push(response)
        this.organizationSubject.next(t);
      });
  }

}




