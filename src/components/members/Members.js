import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import NewMember from './new-member/NewMember';
import MemberList from './member-list/MemberList';
import MemberDetail from './member-detail/MemberDetail';
import ExtendMember from './extend-member/ExtendMember';

function Members() {
    let { param } = useParams();
 
    if (param === 'new')
        return (<NewMember />);
    
    else if (param === 'all')
        return (<MemberListRouteWrapper />);
    
    else if (param === 'extend')
        return (<ExtendMember />);

    return (<MemberDetail memberId={param} />);
}

const MemberListRouteWrapper = withRouter(({ history }) => (<MemberList history={history} />));

export default Members;
