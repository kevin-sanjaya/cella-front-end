import { combineReducers } from 'redux';
import members from './members';
import trainers from './trainers';

export default combineReducers({ members, trainers });
