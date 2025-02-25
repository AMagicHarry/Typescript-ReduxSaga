import { EntityActionTypes } from "@/redux/entities/constants.ts";
import { Entity } from "@/redux/entities/reducers.ts";

export interface EntityActionType {
  type:
    | EntityActionTypes.GET_ENTITIES
    | EntityActionTypes.API_RESPONSE_ERROR
    | EntityActionTypes.API_RESPONSE_SUCCESS;
  payload: {} | string;
}


export const getEntities = (): EntityActionType => ({
  type: EntityActionTypes.GET_ENTITIES,
  payload: {},
});

export const entityApiResponseSuccess = (
  actionType: string,
  data: Entity | {}
): EntityActionType => ({
  type: EntityActionTypes.API_RESPONSE_SUCCESS,
  payload: {
    actionType, data
  }
});

export const entityApiResponseError = (
  actionType: string,
  error: string
): EntityActionType => ({
  type: EntityActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error }
})