export interface TableListItem {
  userName: string,
  status: number,
  password?: string;
  organizations?: [];
  userNo?: string;
  statusName: string
}

export interface TableListPagination {
  totalCount: number;
  pageSize: number;
  pageNo: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}


export interface AddSystemUserParams {
  userName: string,
  password: string,
  organizations: [],
}

export interface ListSystemUserParams {
  content: string,
  status: number,
  pageNo: number,
  pageSize: number,
}
