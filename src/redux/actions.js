import { FETCH_MEMBER_BY_ID, FETCH_TRAINER_LIST, FETCH_TRAINER_BY_ID, FETCH_CHECKED_IN_MEMBER_LIST, FETCH_EMERGENCY_CONTACT_LIST } from "./actionTypes";
import mockApi from '../mock-api/mockApi';

export const storeReducer = (type, payload) => ({ type: type, payload: payload });

export const fetchMemberById = (id, callback) => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchMemberById(id)
            .then(member => {
                dispatch(storeReducer(FETCH_MEMBER_BY_ID, member.data));
                callback(true);
            })
            .catch(() => callback(false))
    }
};


export const fetchTrainerById = (id, callback) => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchTrainerById(id)
            .then(trainer => {
                dispatch(storeReducer(FETCH_TRAINER_BY_ID, trainer.data));
                callback(true);
            })
            .catch(() => callback(false))
    }
};

export const fetchTrainerList = callback => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchTrainerList()
            .then(trainers => {
                dispatch(storeReducer(FETCH_TRAINER_LIST, trainers.data));
                callback(true);
            })
            .catch(() => callback(false))
    }
};

export const fetchCheckedInMemberList = callback => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchCheckedInMemberList()
            .then(members => {
                dispatch(storeReducer(FETCH_CHECKED_IN_MEMBER_LIST, members.data));
                callback(true);
            })
            .catch(() => callback(false))
    }
};

export const fetchEmergencyContactList = callback => {
    return dispatch => {
        mockApi.fetchEmergencyContactList()
            .then(contacts => {
                dispatch(storeReducer(FETCH_EMERGENCY_CONTACT_LIST, contacts.data));
                callback(true);
            })
            .catch(() => callback(false))
    }
};