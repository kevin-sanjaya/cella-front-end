import React from 'react';
import { useParams } from "react-router-dom";
import CheckInMember from "./check-in-member/CheckInMember";
import CheckInTrainer from "./CheckInTrainer";

function CheckIn() {
    let { param } = useParams();

    if (param === 'member')
        return (<CheckInMember />);
    
    else if (param === 'trainer')
        return (<CheckInTrainer />);
    
    return 'Not Found';
}

export default CheckIn;
