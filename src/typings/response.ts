export interface ErrorData {
  status: string;
  errors: {
    fullMessages: string[];
  };
}

export interface ErrorResponse {
  success: boolean;
  errors: string[];
}

export interface SingleErrorResponse {
  error: string;
}
