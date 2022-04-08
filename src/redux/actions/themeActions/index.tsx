import { PaletteMode } from "@mui/material";
import * as types from "../../types";

export const changeTheme = (theme: PaletteMode) => {
  return {
    type: types.CHANGE_THEME,
    payload: theme,
  };
};
