import {FilterMetadata} from "primeng/api";
import {HttpParams} from "@angular/common/http";
import {SpringFilter} from "spring-filter-ng";

export class FilterMetaDataUtils {

  public static setParams(params: HttpParams,
                          filtersMetadata: { [s: string]: FilterMetadata | FilterMetadata[]; }): HttpParams {
    if (!filtersMetadata) return params;

    let springFilters: SpringFilterCustom[] = [];

    Object.keys(filtersMetadata).forEach((key) => {
      let left: string | undefined;
      let operator: string | undefined;
      let right: string | undefined;

      left = key;
      if (filtersMetadata[key]) {
        if (Array.isArray(filtersMetadata[key])) {
          let fmdArr: FilterMetadata[] = <FilterMetadata[]>filtersMetadata[key];
          fmdArr.forEach(fmd => {
            operator = fmd.matchMode;
            if (fmd.value) {
              right = this.setRight(fmd.value);
              springFilters.push(new SpringFilterCustom(left, operator, right));
            }
          })
        } else {
          let fmd: FilterMetadata = <FilterMetadata>filtersMetadata[key];
          operator = fmd.matchMode;
          if (fmd.value) {
            right = this.setRight(fmd.value);
            springFilters.push(new SpringFilterCustom(left, operator, right));
          }

        }
      }
    })

    params = this.setFiltersToParams(params, springFilters);
    return params;
  }

  private static setFiltersToParams(params: HttpParams, springFilters: SpringFilterCustom[]): HttpParams {
    if (springFilters.length == 0) return params;
    springFilters.forEach(filter => {
        params = params.append("filter", filter.toString());
      }
    )
    return params;
  }

  private static setRight(value: string | string[]): string {
    if (!value) return "";
    let result: string;
    if (Array.isArray(value)) {
      result = "[";
      value.forEach((item, index, arr) => {
        result = result + "\'" + item + "\'";
        if (index < arr.length - 1) result = result + ",";
      })
      result = result + "]"
    } else {
      result = "\'" + value + "\'";
    }
    return result;
  }

}

export class SpringFilterCustom {
  left: string | undefined;
  operator: string | undefined;
  right: string | undefined;


  constructor(left: string | undefined, operator: string | undefined, right: string | undefined) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  public toString() {
    if (this.left && this.operator && this.right) return this.left + " " + this.operator + " " + this.right;
    return "";
  }
}
