import { CategoryActionTypes } from "@/redux/categories/constants.ts";
import { Category } from "@/redux/categories/reducers.ts";

export interface CategoryActionType {
  type:
    | CategoryActionTypes.GET_CATEGORIES
    | CategoryActionTypes.API_RESPONSE_ERROR
    | CategoryActionTypes.API_RESPONSE_SUCCESS;
  payload: {} | string;
}

export const getCategories = (): CategoryActionType => ({
  type: CategoryActionTypes.GET_CATEGORIES,
  payload: {},
});

export const categoryApiResponseSuccess = (
  actionType: string,
  data: Category | {}
): CategoryActionType => ({
  type: CategoryActionTypes.API_RESPONSE_SUCCESS,
  payload: {
    actionType, data
  }
});

export const categoryApiResponseError = (
  actionType: string,
  error: string
): CategoryActionType => ({
  type: CategoryActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error }
})