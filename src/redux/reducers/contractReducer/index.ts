import { PaletteMode } from '@mui/material';

type ActionType = {
  type?: string;
  payload?: any;
};

type StateType = {
  instance: any;
};

const initState: StateType = {
  instance: null,
};

const contractReducer = (
  state: StateType = initState,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case 'SET_INSTANCE': {
      return {
        ...state,
        instance: action.payload,
      };
    }
  }

  return state;
};

export default contractReducer;
