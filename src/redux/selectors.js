export const getStateForMembers = store => store.members;

export const getStateForTrainers = store => store.trainers;

export const getStateForCheckedInMembers = store => store.checkedInMembers;

export const getStateForCheckedInTrainers = store => store.checkedInTrainers;

export const getMemberList = store => getStateForMembers(store) ? getStateForMembers(store).members : [];

export const getMemberById = store => getStateForMembers(store) ? getStateForMembers(store).memberById : {};

export const getTrainerList = store => getStateForTrainers(store) ? getStateForTrainers(store).trainers : [];

export const getTrainerById = store => getStateForTrainers(store) ? getStateForTrainers(store).trainerById : {};

export const getCheckedInMemberList = store => getStateForCheckedInMembers(store) ? getStateForCheckedInMembers(store).checkedInMembers : [];

export const getCheckedInTrainerList = store => getStateForCheckedInTrainers(store) ? getStateForCheckedInTrainers(store).checkedInTrainers : [];
