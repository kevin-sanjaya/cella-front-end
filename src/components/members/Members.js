import React from 'react';
import { useParams } from 'react-router-dom';
import NewMember from './new-member/NewMember';
import Alert from '../alert/Alert';
import notFoundSymbol from '../../assets/404.svg';

function Members() {
    let { param } = useParams();
 
    if (param === 'new')
        return <NewMember />

    return (<Alert alertSymbol={notFoundSymbol} alertText="Mohon maaf, halaman ini tidak dapat ditemukan." />);
}

export default Members;
