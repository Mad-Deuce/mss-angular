import {Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class OptionsService {

  serverBaseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  optionsSubject = new BehaviorSubject<any[]>([]);

  getOptions(field: string): void {
    let params = new HttpParams()
      .set("field", field)
    this.http.get<string[]>(this.serverBaseUrl + 'api/filter/options', {params})
      .subscribe(value => {
        this.optionsSubject.next(value);
      });
  }
}
