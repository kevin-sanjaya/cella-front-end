import React from 'react';

import { useParams } from "react-router-dom";

import Member from "./Member";
import Trainer from "./Trainer";

function CheckIn() {
    let { type } = useParams();

    if (type === 'member')
        return (<Member />);
    
    else if (type === 'trainer')
        return (<Trainer />);  
}

export default CheckIn;
