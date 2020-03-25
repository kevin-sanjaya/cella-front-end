import { FETCH_MEMBER_BY_ID } from "./actionTypes";
import mockApi from '../mock-api/mockApi';

export const callReducerForMembers = (type, payload) => ({
    type: type,
    payload: payload
});

export const fetchMemberByIdService = (id, callback) => { // TODO: change to axios
    return dispatch => {
        mockApi.fetchMemberById(id)
            .then(member => {
                dispatch(callReducerForMembers(FETCH_MEMBER_BY_ID, member));
                callback(true);
            })
            .catch(err => {
                console.log(err);
                callback(false);
            })
    };
};