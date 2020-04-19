import { FETCH_CHECKED_IN_MEMBER_LIST } from "../actionTypes";

const initialState = {
    checkedInMembers: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CHECKED_IN_MEMBER_LIST: {
            const checkedInMembers = action.payload;

            return {...state, checkedInMembers };
        }
        default:
            return state;
    }
}
