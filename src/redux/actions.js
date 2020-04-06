import { FETCH_MEMBER_BY_ID, FETCH_TRAINER_LIST } from "./actionTypes";
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
    };
};

export const fetchTrainerList = callback => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchTrainerList()
            .then(trainers => {
                dispatch(storeReducer(FETCH_TRAINER_LIST, trainers.data));
                callback(true);
            })
            .catch(() => callback(false))
    };
};