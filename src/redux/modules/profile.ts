// action + reducer in the same file
import { PROFILE_ME } from './constants';
import { Profile } from '../../models/';

// actions
export const setProfileMe = (id: number) => {
  return {
    type: PROFILE_ME,
    id,
  };
};

const initialState: Profile = {
  id: 0,
};

// reducer
export default function profile(state = initialState, action: any): Profile {
  switch (action.type) {
    case PROFILE_ME:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
}
