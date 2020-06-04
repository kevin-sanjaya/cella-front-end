export const getStateForMembers = store => store.members;

export const getStateForTrainers = store => store.trainers;

export const getStateForEmergencyContacts = store => store.emergencyContacts;

export const getStateForRoomSchedules = store => store.roomSchedules;

export const getStateForInvoice = store => store.invoice;

export const getMemberList = store => getStateForMembers(store) ? getStateForMembers(store).members : [];

export const getMemberById = store => getStateForMembers(store) ? getStateForMembers(store).memberById : {};

export const getTrainerList = store => getStateForTrainers(store) ? getStateForTrainers(store).trainers : [];

export const getTrainerById = store => getStateForTrainers(store) ? getStateForTrainers(store).trainerById : {};

export const getCheckedInMemberList = store => getStateForMembers(store) ? getStateForMembers(store).checkedInMembers : [];

export const getCheckedInTrainerList = store => getStateForTrainers(store) ? getStateForTrainers(store).checkedInTrainers : [];

export const getEmergencyContactList = store => getStateForEmergencyContacts(store) ? getStateForEmergencyContacts(store).emergencyContacts : [];

export const getRoomScheduleList = store => getStateForRoomSchedules(store) ? getStateForRoomSchedules(store).roomSchedules : [];

export const getInvoice = store => getStateForInvoice(store) ? getStateForInvoice(store).invoice : {};
