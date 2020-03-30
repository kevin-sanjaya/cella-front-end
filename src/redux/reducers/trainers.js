import { FETCH_TRAINER_LIST } from "../actionTypes";

const initialState = {
    trainers: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRAINER_LIST: {
            const trainers = action.payload;

            return {...state, trainers };
        }
        default:
            return state;
    }
}
