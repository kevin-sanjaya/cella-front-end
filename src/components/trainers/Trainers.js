import React from 'react';
import { useParams } from "react-router-dom";
import TrainerList from "./trainer-list/TrainerList";
import Alert from '../alert/Alert';
import notFoundSymbol from '../../assets/404.svg';

function Trainers() {
    let { param } = useParams();

    if (param === 'all')
        return (<TrainerList />);
    
    return (<Alert alertSymbol={notFoundSymbol} alertText="Mohon maaf, halaman ini tidak dapat ditemukan." />);
}

export default Trainers;
