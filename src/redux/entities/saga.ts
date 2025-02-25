import { SagaIterator } from "@redux-saga/core";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getEntities as getEntitiesApi
} from "@/helpers/api/entity.ts";
import { entityApiResponseError, entityApiResponseSuccess } from "@/redux/entities/actions.ts";
import { EntityActionTypes } from "@/redux/entities/constants.ts";


function* getEntities(): SagaIterator {
  try {
    const response = yield call(getEntitiesApi);
    const entities = response.data.entities;
    yield put(entityApiResponseSuccess(EntityActionTypes.GET_ENTITIES, entities));
  } catch (error: any) {
    yield put(entityApiResponseError(EntityActionTypes.GET_ENTITIES, error));
  }
}

export function* watchGetEntities() {
  yield takeEvery(EntityActionTypes.GET_ENTITIES, getEntities)
}

function* entitySaga() {
  yield all([
    fork(watchGetEntities),
  ]);
}

export default entitySaga;