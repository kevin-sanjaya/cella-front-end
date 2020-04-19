import { combineReducers } from "redux";
import members from "./members";
import trainers from "./trainers";
import checkedInMembers from "./checked-in-members";
import checkedInTrainers from "./checked-in-members";

export default combineReducers({ members, trainers, checkedInMembers, checkedInTrainers });
