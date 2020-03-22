import { FETCH_MEMBER_BY_ID } from "./actionTypes";

import mockApi from '../mock-api/mockApi';

export const fetchMemberById = member => ({
    type: FETCH_MEMBER_BY_ID,
    payload: { member }
});

// TODO: switch to api call soon instead of filtering mock response
export const fetchMemberByIdService = (id, callback) => {
    return (dispatch) => {
        mockApi.fetchMembers()
            .then(members => {
                dispatch(fetchMemberById(members.find(member => member.memberId === id)));
                callback(true);
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchMemberById(undefined));
                callback(false);
            })
    };
}