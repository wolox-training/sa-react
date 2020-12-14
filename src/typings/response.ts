export interface ErrorData {
  status: string;
  errors: {
    fullMessages: string[];
  };
}

export interface ErrorAuthData {
  success: boolean;
  errors: string[];
}
