import { clearSession, getSession, saveSession, SessionData } from '../../../services/LocalStorageService';
import { Nullable } from '../../../utils/types';

export interface UserState {
  session: Nullable<SessionData>;
}

export const INITIAL_STATE = {
  session: null
};

enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EVALUATE_SESSION = 'EVALUATE_SESSION'
}

interface Login {
  type: ActionTypes.LOGIN;
  payload: SessionData;
}

interface Logout {
  type: ActionTypes.LOGOUT;
}

interface EvaluateSession {
  type: ActionTypes.EVALUATE_SESSION;
  payload: Nullable<SessionData>;
}

export type Action = Login | Logout | EvaluateSession;

export const actionCreators = {
  login: (session: SessionData): Login => {
    saveSession(session);

    return { type: ActionTypes.LOGIN, payload: session };
  },
  logout: (): Logout => {
    clearSession();

    return { type: ActionTypes.LOGOUT };
  },
  evaluateSession: (): EvaluateSession => {
    const payload = getSession();

    return { type: ActionTypes.EVALUATE_SESSION, payload };
  }
};

export const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        session: action.payload
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        session: null
      };

    case ActionTypes.EVALUATE_SESSION:
      return {
        ...state,
        session: action.payload
      };

    default: {
      return state;
    }
  }
};
