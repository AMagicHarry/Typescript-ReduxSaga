import axios from "axios";
import { GaugeData } from "@/pages/gauges/create";
import { GaugeFilter } from "@/redux/gauges/reducers";

export interface GaugeValueData {
  year: number,
  quarter: number,
  value: number,
}

function getGauges(filter: GaugeFilter) {
  return axios.get('/gauges', { params: filter } );
}

function createGauge(params: GaugeData) {
  return axios.post('/gauges', params);
}

function approveGauges(ids: number[], year: number, quarter: number) {
  return axios.patch('/gauges/approve', { ids, year, quarter });
}

function updateGaugeValue(gaugeId: number, data: GaugeValueData) {
  return axios.patch(`/gauges/${gaugeId}/update-value`, data);
}

export { getGauges, createGauge, approveGauges, updateGaugeValue };
