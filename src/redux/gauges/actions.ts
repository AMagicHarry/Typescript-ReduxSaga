import { GaugeActionTypes } from "@/redux/gauges/constants.ts";
import { Gauge, GaugeFilter } from "@/redux/gauges/reducers.ts";

export interface GaugeActionType {
  type:
    | GaugeActionTypes.GET_GAUGES
    | GaugeActionTypes.APPROVE_GAUGES
    | GaugeActionTypes.API_RESPONSE_SUCCESS
    | GaugeActionTypes.RESET
    | GaugeActionTypes.UPDATE_FILTER
    | GaugeActionTypes.UPDATE_YEAR
    | GaugeActionTypes.UPDATE_QUARTER
    | GaugeActionTypes.API_RESPONSE_ERROR;
  payload: {} | string;
}

export const getGauges = (filter: GaugeFilter): GaugeActionType => ({
  type: GaugeActionTypes.GET_GAUGES,
  payload: { filter },
});

export const approveGauges = (ids: number[], year: number, quarter: number): GaugeActionType => ({
  type: GaugeActionTypes.APPROVE_GAUGES,
  payload: { ids, year, quarter },
});

export const gaugeApiResponseSuccess = (
  actionType: string,
  data: Gauge | {}
): GaugeActionType => ({
  type: GaugeActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const gaugeApiResponseError = (
  actionType: string,
  error: string
): GaugeActionType => ({
  type: GaugeActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const resetGauges = (): GaugeActionType => ({
  type: GaugeActionTypes.RESET,
  payload: {},
});

export const updateFilter = (filter: GaugeFilter): GaugeActionType => ({
  type: GaugeActionTypes.UPDATE_FILTER,
  payload: filter,
});

export const updateYear = (year: number): GaugeActionType => ({
  type: GaugeActionTypes.UPDATE_YEAR,
  payload: year,
});

export const updateQuarter = (quarter: number): GaugeActionType => ({
  type: GaugeActionTypes.UPDATE_QUARTER,
  payload: quarter,
});
