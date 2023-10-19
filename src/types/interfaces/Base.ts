export interface ApiSingleResponse<T> {
  success: boolean;
  errorCode: string;
  statusCode: number;
  message: string;
  data: T;
  meta: Record<string, any>;
}

export interface ApiListResponse<T> {
  success: boolean;
  errorCode: string;
  statusCode: number;
  message: string;
  data: {
    results: T;
    metadata: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
      sortBy: any;
      filter: string;
    };
  };
  meta: Record<string, any>;
}
