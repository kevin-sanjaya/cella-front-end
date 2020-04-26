import { FETCH_EMERGENCY_CONTACT_LIST} from '../actionTypes';

const initialState = {
    emergencyContacts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMERGENCY_CONTACT_LIST: {
            const emergencyContacts = action.payload;
            
            return {...state, emergencyContacts };
        }
        default:
            return state;
    }
}
