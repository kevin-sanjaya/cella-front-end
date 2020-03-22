export const getStateForMembers = store => store.members;

export const getMemberList = store => getStateForMembers(store) ? getStateForMembers(store).members : [];

export const getMemberById = store => getStateForMembers(store) ? getStateForMembers(store).memberById : {};
