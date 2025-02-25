import { INITIAL_EMISSIONS_DATA } from "@/constants/emissions";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type DataStatus = "draft" | "pending" | "approved" | "finalized";

export interface EntryData {
  value: number;
  status: DataStatus;
  approvedBy?: string;
  approvedAt?: Date;
  lastModified: Date;
}

export interface QuarterData {
  [mode: string]: (EntryData | undefined);
}

export interface YearData {
  [quarter: string]: QuarterData;
}

interface CommutingData {
  [year: string]: YearData;
}

interface CommutingState {
  data: CommutingData;
  selectedYear: string;
  selectedQuarter: string;
  companyName: string;
  descriptions: {
    [key: string]: string;
  };
}

type Action =
  | {
      type: "UPDATE_DATA";
      payload: {
        year: string;
        quarter: string;
        mode: string;
        value: number;
        status: DataStatus;
      };
    }
  | {
      type: "APPROVE_DATA";
      payload: {
        year: string;
        quarter: string;
        mode: string;
        approvedBy: string;
      };
    }
  | {
      type: "UNDO_DATA";
      payload: {
        year: string;
        quarter: string;
        mode: string;
      };
    }
  | {
      type: "REJECT_DATA";
      payload: {
        year: string;
        quarter: string;
        mode: string;
        approvedBy: string;
      };
    }
  | { type: "FINALIZE_DATA"; payload: { year: string; quarter: string } }
  | { type: "SET_SELECTED_YEAR"; payload: string }
  | { type: "SET_SELECTED_QUARTER"; payload: string }
  | { type: "SET_COMPANY_NAME"; payload: string }
  | {
      type: "UPDATE_DESCRIPTION";
      payload: { mode: string; description: string };
    };

const currentYear = new Date().getFullYear().toString();

const initialState: CommutingState = {
  data: INITIAL_EMISSIONS_DATA as CommutingData,
  selectedYear: currentYear,
  selectedQuarter: "Q1",
  companyName: "TrackJack Europe B.V.",
  descriptions: {
    publicTransport: "Public transportation including buses and trains",
    cycling: "Cycling and walking activities",
    passengerCar: "Regular passenger vehicles",
    gasolineCar: "Gasoline-powered vehicles",
    dieselCar: "Diesel-powered vehicles",
    hybridCar: "Hybrid electric vehicles",
    electricCar: "Fully electric vehicles",
    airplaneEurope: "European air travel",
  },
};

function commutingReducer(
  state: CommutingState,
  action: Action
): CommutingState {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.year]: {
            ...state.data[action.payload.year],
            [action.payload.quarter]: {
              ...state.data[action.payload.year]?.[action.payload.quarter],
              [action.payload.mode]: {
                value: action.payload.value,
                status: action.payload.status,
                lastModified: new Date(),
              },
            },
          },
        },
      };

    case "APPROVE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.year]: {
            ...state.data[action.payload.year],
            [action.payload.quarter]: {
              ...state.data[action.payload.year]?.[action.payload.quarter],
              [action.payload.mode]: {
                ...state.data[action.payload.year]?.[action.payload.quarter]?.[
                  action.payload.mode
                ],
                status: "approved",
                approvedBy: action.payload.approvedBy,
                approvedAt: new Date(),
              } as EntryData,
            },
          },
        },
      };

    case "UNDO_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.year]: {
            ...state.data[action.payload.year],
            [action.payload.quarter]: {
              ...state.data[action.payload.year]?.[action.payload.quarter],
              [action.payload.mode]: {
                ...state.data[action.payload.year]?.[action.payload.quarter]?.[
                  action.payload.mode
                ],
                status: "draft",
                approvedAt: new Date(),
              } as EntryData
            },
          },
        },
      };

    case "REJECT_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.year]: {
            ...state.data[action.payload.year],
            [action.payload.quarter]: {
              ...state.data[action.payload.year]?.[action.payload.quarter],
              [action.payload.mode]: undefined
            },
          },
        },
      };

    case "FINALIZE_DATA": {
      const quarterData =
        state.data[action.payload.year]?.[action.payload.quarter];
      const updatedQuarterData = Object.entries(quarterData).reduce(
        (acc, [mode, data]) => ({
          ...acc,
          [mode]: {
            ...data,
            status: "finalized",
          },
        }),
        {}
      );

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.year]: {
            ...state.data[action.payload.year],
            [action.payload.quarter]: updatedQuarterData,
          },
        },
      };
    }

    case "SET_SELECTED_YEAR":
      return {
        ...state,
        selectedYear: action.payload,
      };

    case "SET_SELECTED_QUARTER":
      return {
        ...state,
        selectedQuarter: action.payload,
      };

    case "SET_COMPANY_NAME":
      return {
        ...state,
        companyName: action.payload,
      };

    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        descriptions: {
          ...state.descriptions,
          [action.payload.mode]: action.payload.description,
        },
      };

    default:
      return state;
  }
}

const CommutingContext = createContext<
  | {
      state: CommutingState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function CommutingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(commutingReducer, initialState);

  return (
    <CommutingContext.Provider value={{ state, dispatch }}>
      {children}
    </CommutingContext.Provider>
  );
}

export function useCommuting() {
  const context = useContext(CommutingContext);
  if (context === undefined) {
    throw new Error("useCommuting must be used within a CommutingProvider");
  }
  return context;
}
