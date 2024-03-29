export interface SuccessResponse<T = undefined> {
    page: number;
    total_pages: number;
    total_results: number;
    results: T;
}

export type APIResponse<T = undefined> = SuccessResponse<T>;
