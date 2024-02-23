export class PageableDto {
  sort: {
    sortField: "";
    sortOrder: "";
  } | undefined;
  pageNumber: number = 0;
  pageSize: number = 38;
}
