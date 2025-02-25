import { CategoryActionTypes } from "@/redux/categories/constants.ts";

const INIT_STATE = {
  categories: [],
  loading: false
};

export interface Category {
  id: number;
  name: string;
}

interface State {
  categories: Category[];
  loading: boolean;
  error?: string;
}


const CategoryReducer = (state: State = INIT_STATE, action: any): any => {
  switch (action.type) {
    case CategoryActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case CategoryActionTypes.GET_CATEGORIES: {
          return {
            ...state,
            categories: action.payload.data,
            loading: false,
          };
        }
        default:
          return { ...state };
      }
    case CategoryActionTypes.GET_CATEGORIES:
      return { ...state, loading: true };
    default :
      return { ...state };
  }
}

export default CategoryReducer;