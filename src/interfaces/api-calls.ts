export interface StandardResponse<T = null> {
  success: boolean;
  data: T | null;
  msg: string;
}
