import members from './members/members.json';

const fetch = (mockData, time = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
};

export default {
    fetchMembers() {
        return fetch(members, 2000)
    }
}