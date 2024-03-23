
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
