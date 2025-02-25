import { SagaIterator } from "@redux-saga/core";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GaugeActionTypes } from "@/redux/gauges/constants.ts";
import { gaugeApiResponseError, gaugeApiResponseSuccess } from "@/redux/gauges/actions.ts";
import {
  getGauges as getGaugesApi,
  approveGauges as approveGaugesApi
} from "@/helpers/api/gauge.ts";
import { GaugeFilter } from "./reducers";

interface GetGaugesAction {
  payload: { filter: GaugeFilter };
  type: string;
}

function* getGauges({ payload: { filter } }: GetGaugesAction): SagaIterator {
  try {
    const response = yield call(getGaugesApi, filter);
    const gauges = response.data.gauges;
    yield put(gaugeApiResponseSuccess(GaugeActionTypes.GET_GAUGES, gauges));
  } catch (error: any) {
    yield put(gaugeApiResponseError(GaugeActionTypes.GET_GAUGES, error));
  }
}

function* approveGauges({
  payload: { ids, year, quarter }
}: { payload: { ids: number[], year: number, quarter: number }, type: string }): SagaIterator {
  try {
    const response = yield call(approveGaugesApi, ids, year, quarter);
    yield put(gaugeApiResponseSuccess(GaugeActionTypes.APPROVE_GAUGES, response.data));
  } catch (error: any) {
    yield put(gaugeApiResponseError(GaugeActionTypes.APPROVE_GAUGES, error));
  }
}

export function* watchGetGauges() {
  yield takeEvery(GaugeActionTypes.GET_GAUGES, getGauges)
}

export function* watchApproveGauges() {
  yield takeEvery(GaugeActionTypes.APPROVE_GAUGES, approveGauges)
}

function* gaugeSaga() {
  yield all([
    fork(watchGetGauges),
    fork(watchApproveGauges),
  ]);
}

export default gaugeSaga;