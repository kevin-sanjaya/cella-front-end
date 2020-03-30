import React from 'react';
import { useParams } from "react-router-dom";
import TrainerList from "./trainer-list/TrainerList";

function Trainers() {
    let { param } = useParams();

    if (param === 'all')
        return (<TrainerList />);
    
    else
        return 'Not Found';
}

export default Trainers;
