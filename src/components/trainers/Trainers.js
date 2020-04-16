import React from 'react';
import { useParams, withRouter } from "react-router-dom";
import TrainerList from "./trainer-list/TrainerList";
import TrainerDetail from "./trainer-detail/TrainerDetail";

function Trainers() {
    let { param } = useParams();
 
    if (param === 'all')
        return <TrainerListRouteWrapper />
    
    return <TrainerDetail trainerId={param} />
}

const TrainerListRouteWrapper = withRouter(({ history }) => (<TrainerList history={history} />));

export default Trainers;
