import { SagaIterator } from "@redux-saga/core";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getCategories as getCategoriesApi
} from "@/helpers/api/category.ts";
import { CategoryActionTypes } from "@/redux/categories/constants.ts";
import { categoryApiResponseError, categoryApiResponseSuccess } from "@/redux/categories/actions.ts";


function* getCategories(): SagaIterator {
  try {
    const response = yield call(getCategoriesApi);
    const categories = response.data.categories;
    yield put(categoryApiResponseSuccess(CategoryActionTypes.GET_CATEGORIES, categories));
  } catch (error: any) {
    yield put(categoryApiResponseError(CategoryActionTypes.GET_CATEGORIES, error));
  }
}

export function* watchGetCategories() {
  yield takeEvery(CategoryActionTypes.GET_CATEGORIES, getCategories)
}

function* categorySaga() {
  yield all([
    fork(watchGetCategories),
  ]);
}

export default categorySaga;