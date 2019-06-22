/* eslint-disable semi */
// Action creator
export const handleEditProfile = currUserId =>
// Returns an action object
  ({
    type: 'CURR_USER_ID',
    payload: currUserId,
  })
