import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class OptionsService {


  optionsSubject = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
  }

  getOptions(field: string): void {

    let params = new HttpParams()
      .set("field", field)

    this.http.get<string[]>('/api/filter/options', {params})
      .subscribe(value => {
        this.optionsSubject.next(value);
      });
  }
}
