import React from 'react';

import { useParams } from "react-router-dom";

import CheckInMember from "./check-in-member/CheckInMember";
import CheckInTrainer from "./CheckInTrainer";

function CheckIn() {
    let { type } = useParams();

    if (type === 'member')
        return (<CheckInMember />);
    
    else if (type === 'trainer')
        return (<CheckInTrainer />);
}

export default CheckIn;
