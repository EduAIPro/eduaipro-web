export type Pagination = {
  total: number;
  page: number;
  limit: number;
};

export type ApiResponse = {
  error: null | string;
  statusCode: number;
  message: string;
  data: any;
};
