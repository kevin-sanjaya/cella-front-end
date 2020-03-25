import members from './members/members.json';
import memberById from './members/member-by-id.json';

const fetch = (mockData, time = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
};

export default {
    fetchMembers() { // TODO: /members
        return fetch(members, 2000);
    },
    fetchMemberById(id) { // TODO: /members/:id
        return fetch(memberById, 2000);
    }
}