import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient,} from "@angular/common/http";

@Injectable()
export class OrganizationFilterService {


  constructor(private http: HttpClient) {
  }

  organizationSubject = new BehaviorSubject<any[]>([]);

  getOrganizationStructure() {
    this.http.get<any>('/api/org/structure', {})
      .subscribe(response => {
        let t = [];
        t.push(response)
        this.organizationSubject.next(t);
      });
  }

}




