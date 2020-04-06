import React from 'react';
import { useParams } from "react-router-dom";
import CheckInMember from "./check-in-member/CheckInMember";
import CheckInTrainer from "./CheckInTrainer";
import Alert from '../alert/Alert';
import notFoundSymbol from '../../assets/404.svg';

function CheckIn() {
    let { param } = useParams();

    if (param === 'member')
        return (<CheckInMember />);
    
    else if (param === 'trainer')
        return (<CheckInTrainer />);
    
    return (<Alert alertSymbol={notFoundSymbol} alertText="Mohon maaf, halaman ini tidak dapat ditemukan." />);
}

export default CheckIn;
