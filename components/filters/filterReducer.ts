export interface InitialStateInterface {
  fromDate: Date | string;
  toDate: Date | string;
  genres: number[];
  language: string;
}

export const ActionTypes = {
  FROM_DATE: "UPDATE_FROM_DATE",
  TO_DATE: "UPDATE_TO_DATE",
  GENRES: "UPDATE_GENRES",
  LANGUAGES: "UPDATE_LANGUAGES",
  RESET: "RESET_FORM",
};

type FormAction =
  | {
      type: typeof ActionTypes.FROM_DATE;
      payload: Date;
    }
  | {
      type: typeof ActionTypes.TO_DATE;
      payload: Date;
    }
  | {
      type: typeof ActionTypes.GENRES;
      payload: number[];
    }
  | {
      type: typeof ActionTypes.LANGUAGES;
      payload: string;
    }
  | {
      type: typeof ActionTypes.RESET;
      payload: InitialStateInterface;
    };

export const initialState: InitialStateInterface = {
  fromDate: "",
  toDate: "",
  genres: [] as number[],
  language: "",
};

export const filterReducer = (
  state: InitialStateInterface,
  action: FormAction
): InitialStateInterface => {
  switch (action.type) {
    case ActionTypes.FROM_DATE:
      return { ...state, fromDate: action.payload as Date };

    case ActionTypes.TO_DATE:
      return { ...state, toDate: action.payload as Date };

    case ActionTypes.GENRES:
      return { ...state, genres: action.payload as number[] };

    case ActionTypes.LANGUAGES:
      return { ...state, language: action.payload as string };

    case ActionTypes.RESET:
      return { fromDate: "", toDate: "", genres: [], language: "" };

    default:
      return state;
  }
};
