import { FETCH_TRAINER_LIST, FETCH_TRAINER_BY_ID } from "../actionTypes";

const initialState = {
    trainers: [],
    trainerById: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRAINER_LIST: {
            const trainers = action.payload;

            return {...state, trainers };
        }
        case FETCH_TRAINER_BY_ID: {
            const trainerById = action.payload;

            return {...state, trainerById };
        }
        default:
            return state;
    }
}
