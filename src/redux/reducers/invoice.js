import { FETCH_INVOICE} from '../actionTypes';

const initialState = {
    invoice: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_INVOICE: {
            const invoice = action.payload;
            
            return {...state, invoice };
        }
        default:
            return state;
    }
}
