import members from './members/members.json';
import trainers from './trainers/trainers.json';

const fetch = (data, id = null) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let dataById;
            if (id !== null) {
                dataById = data.find(data => data.memberId === id);
                if (dataById === undefined)
                    dataById = {};
            }
            resolve(id === null ? { data } : { data: dataById });
        }, 2000)
    })
};

export default {
    fetchMemberList() { // TODO: /members
        return fetch(members);
    },
    fetchMemberById(id) { // TODO: /members/:id
        return fetch(members, id);
    },
    fetchTrainerList() {
        return fetch(trainers);
    }
}