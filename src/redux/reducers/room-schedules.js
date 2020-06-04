import { FETCH_ROOM_SCHEDULE_LIST } from '../actionTypes';

const initialState = {
    roomSchedules: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ROOM_SCHEDULE_LIST: {
            const roomSchedules = action.payload;
            
            return {...state, roomSchedules };
        }
        default:
            return state;
    }
}
