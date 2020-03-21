export const getAllStateForMembers = store => store.members;

export const getMemberList = store => getAllStateForMembers(store) ? getAllStateForMembers(store).members : [];

export const getMemberById = store => getAllStateForMembers(store) ? getAllStateForMembers(store).memberById : {};
