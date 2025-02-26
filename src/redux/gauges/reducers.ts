import { GaugeActionTypes } from "@/redux/gauges/constants.ts";
import { Category } from "@/redux/categories/reducers.ts";
import { Entity } from "@/redux/entities/reducers.ts";

export type GaugeFilter = {
  entities: number[];
  categories: number[];
  searchKey: string;
};

export enum GaugeValueStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  SUBMITTED = 'submitted',
}

const INIT_STATE = {
  gauges: [],
  loading: false,
  filter: {
    searchKey: '',
    entities: [],
    categories: [],
  },
  quarter: Math.floor(new Date().getMonth() / 3) + 1,
  year: new Date().getFullYear()
};

export interface GaugeValue {
  id: number;
  value: number;
  year: number;
  quarter: number;
  status: GaugeValueStatus
}

export interface Gauge {
  id: number;
  name: string;
  categories: Category[];
  entities: Entity[];
  values: GaugeValue[];
  description?: string | null;
  energy: number;
  money: number;
  scope1: number;
  scope2_location: number;
  scope2_market: number;
  scope3: number;
  unit: string;
  approved_date?: Date | null;
  submitted_date?: Date | null;
  updated_date?: Date | null;
  time_interval: string;
  started_on: Date;
  ended_on?: Date | null;
  import_only: boolean;
}

interface State {
  gauges: Gauge[];
  loading: boolean;
  error?: string;
  filter: GaugeFilter;
  year: number;
  quarter: number;
}

const GaugeReducer = (state: State = INIT_STATE, action: any): any => {
  switch (action.type) {
    case GaugeActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GaugeActionTypes.GET_GAUGES: {
          return {
            ...state,
            gauges: action.payload.data,
            loading: false,
          };
        }

        case GaugeActionTypes.APPROVE_GAUGES: {
          return {
            ...state,
            approveSuccess: true,
            loading: false,
          };
        }

        default:
          return { ...state };
      }
    case GaugeActionTypes.GET_GAUGES:
      return { ...state, loading: true };
    case GaugeActionTypes.APPROVE_GAUGES:
      return { ...state, loading: true };
    case GaugeActionTypes.UPDATE_FILTER:
      return { ...state, filter: action.payload };
    case GaugeActionTypes.UPDATE_YEAR:
      return { ...state, year: action.payload };
    case GaugeActionTypes.UPDATE_QUARTER:
      return { ...state, quarter: action.payload };
    case GaugeActionTypes.RESET:
      return { ...state, loading: false, approveSuccess: false };
    default:
      return { ...state };
  }
}

export default GaugeReducer;
