import memberList from './members/members.json';
import trainerList from './trainers/trainers.json';
import checkedInMemberList from './checked-in-list/checked-in-members.json';
import checkedInTrainerList from './checked-in-list/checked-in-trainers.json';

const fetch = (data, type = null, id = null) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let dataById;
            if (id !== null) {
                dataById = data.find(data => data[`${type}Id`] === id);
                if (dataById === undefined)
                    dataById = {};
            }
            resolve(id === null ? { data } : { data: dataById });
        }, 2000)
    })
};

export default {
    fetchMemberList() { // TODO: /members
        return fetch(memberList);
    },
    fetchMemberById(id) { // TODO: /members/:id
        return fetch(memberList, 'member', id);
    },
    fetchTrainerList() {
        return fetch(trainerList);
    },
    fetchTrainerById(id) { // TODO: /members/:id
        return fetch(trainerList, 'trainer', id);
    },
    fetchCheckedInMemberList() { // TODO: /check-in/members
        return fetch(checkedInMemberList);
    },
    fetchCheckedInTrainerList() { // TODO: /check-in/trainers
        return fetch(checkedInTrainerList);
    },
}