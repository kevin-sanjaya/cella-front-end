import { combineReducers } from 'redux';
import members from './members';
import trainers from './trainers';
import emergencyContacts from './emergency-contacts';
import roomSchedules from './room-schedules';
import invoice from './invoice';

export default combineReducers({ members, trainers, emergencyContacts, roomSchedules, invoice });
