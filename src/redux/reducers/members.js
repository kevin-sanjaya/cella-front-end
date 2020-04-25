import { FETCH_MEMBER_BY_ID, FETCH_MEMBER_LIST, FETCH_CHECKED_IN_MEMBER_LIST } from '../actionTypes';

const initialState = {
    members: [],
    memberById: {},
    checkedInMembers: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBER_LIST: {
            const members = action.payload;
            
            return {...state, members };
        }
        case FETCH_MEMBER_BY_ID: {
            const memberById = action.payload;

            return {...state, memberById };
        }
        case FETCH_CHECKED_IN_MEMBER_LIST: {
            const checkedInMembers = action.payload;

            return {...state, checkedInMembers };
        }
        default:
            return state;
    }
}
