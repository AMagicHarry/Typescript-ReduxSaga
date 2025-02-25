import { EntityActionTypes } from "@/redux/entities/constants.ts";

const INIT_STATE = {
  entities: [],
  loading: false
};

export interface Entity {
  id: number;
  name: string;
}

interface State {
  entities: Entity[];
  loading: boolean;
  error?: string;
}

const EntityReducer = (state: State = INIT_STATE, action: any): any => {
  switch (action.type) {
    case EntityActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case EntityActionTypes.GET_ENTITIES: {
          return {
            ...state,
            entities: action.payload.data,
            loading: false,
          };
        }
        default:
          return { ...state };
      }
    case EntityActionTypes.GET_ENTITIES:
      return { ...state, loading: true };
    default :
      return { ...state };
  }
}

export default EntityReducer;