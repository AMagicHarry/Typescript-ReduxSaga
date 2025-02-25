import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import gaugeSaga from "./gauges/saga.ts";
import categorySaga from "./categories/saga.ts";
import entitySaga from "./entities/saga.ts";

export default function* rootSaga() {
  yield all([
    authSaga(),
    gaugeSaga(),
    categorySaga(),
    entitySaga(),
  ]);
}
