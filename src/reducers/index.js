import { combineReducers } from 'redux'

const editProfileReducer = (currUserId = null, action) => {
  if (action.type === 'CURR_USER_ID') {
    return action.payload;
  }
  return currUserId;
};

export default combineReducers({
    editUserProfile: editProfileReducer
});
