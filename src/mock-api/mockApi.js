import members from './members/members.json';
import memberById from './members/member-by-id.json';
import trainers from './trainers/trainers.json';

const fetch = (mockData, time = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
};

export default {
    fetchMemberList() { // TODO: /members
        return fetch(members, 2000);
    },
    fetchMemberById(id) { // TODO: /members/:id
        return fetch(memberById, 2000);
    },
    fetchTrainerList() {
        return fetch(trainers, 2000);
    }
}