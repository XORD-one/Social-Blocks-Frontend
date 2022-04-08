import { PaletteMode } from "@mui/material";

type ActionType = {
  type?: string;
  payload?: any;
};

type StateType = {
  theme: PaletteMode;
};

const initState: StateType = {
  theme: "light",
};

const themeReducer = (
  state: StateType = initState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "CHANGE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
  }

  return state;
};

export default themeReducer;
