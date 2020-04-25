import { FETCH_TRAINER_LIST, FETCH_TRAINER_BY_ID, FETCH_CHECKED_IN_TRAINER_LIST } from '../actionTypes';

const initialState = {
    trainers: [],
    trainerById: {},
    checkedInTrainers: []
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
        case FETCH_CHECKED_IN_TRAINER_LIST: {
            const checkedInTrainers = action.payload;

            return {...state, checkedInTrainers };
        }
        default:
            return state;
    }
}
