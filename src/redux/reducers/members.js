import { FETCH_MEMBER_BY_ID, FETCH_MEMBER_LIST } from "../actionTypes";

const initialState = {
    members: [],
    memberById: {}
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
        default:
            return state;
    }
}
