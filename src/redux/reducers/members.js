import { FETCH_MEMBER_BY_ID } from "../actionTypes";

const initialState = {
    members: [],
    memberById: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBER_BY_ID: {
            const { member } = action.payload;
            
            return {...state, memberById: member};
        }
        default:
            return state;
    }
}
