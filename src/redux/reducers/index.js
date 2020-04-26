import { combineReducers } from 'redux';
import members from './members';
import trainers from './trainers';
import emergencyContacts from './emergency-contacts';

export default combineReducers({ members, trainers, emergencyContacts });
