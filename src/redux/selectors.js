export const getStateForMembers = store => store.members;

export const getStateForTrainers = store => store.trainers;

export const getMemberList = store => getStateForMembers(store) ? getStateForMembers(store).members : [];

export const getMemberById = store => getStateForMembers(store) ? getStateForMembers(store).memberById : {};

export const getTrainerList = store => getStateForTrainers(store) ? getStateForTrainers(store).trainers : [];
