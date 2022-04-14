type ActionType = {
  type?: string;
  payload?: any;
};

type StateType = {
  walletAddress: string | null;
  username: string | null;
  displayName: string | null;
  signature: string | null;
  changesModalVisible: boolean;
};

const initState: StateType = {
  walletAddress: null,
  username: null,
  displayName: null,
  signature: null,
  changesModalVisible: false,
};

const userReducer = (
  state: StateType = initState,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case 'SET_WALLET_ADDRESS':
      return {
        ...state,
        walletAddress: action.payload,
      };

    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_SIGNATURE':
      return {
        ...state,
        signature: action.payload,
      };
    case 'SET_CHANGES_MODAL_VISIBLE':
      return {
        ...state,
        changesModalVisible: action.payload,
      };
  }

  return state;
};

export default userReducer;
