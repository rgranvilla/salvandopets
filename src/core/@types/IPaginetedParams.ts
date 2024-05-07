export interface IPaginatedParams<
  SortByType,
  SearchFieldType,
  DateRangeFieldType,
> {
  page?: number;
  perPage?: number;
  sortBy?: SortByType;
  sortOrder?: 'asc' | 'desc';
  searchField?: SearchFieldType;
  searchQuery?: string;
  dateRangeField?: DateRangeFieldType;
  dateRangeStart?: Date;
  dateRangeEnd?: Date;
}
