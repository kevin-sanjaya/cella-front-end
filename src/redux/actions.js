import { FETCH_MEMBER_BY_ID } from "./actionTypes";

import mockApi from '../mock-api/mockApi';

export const findMemberById = member => ({
    type: FETCH_MEMBER_BY_ID,
    payload: { member }
});

export const findMemberByIdMiddleware = id => {
    return (dispatch) => {
        mockApi.fetchMembers()
            .then(members => dispatch(findMemberById(members.find(member => member.memberId === id))))
            .catch(err => console.log(err))
    };
}