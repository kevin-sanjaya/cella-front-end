const route = [
    {
        id: 1, name: 'Cek-in', url: '/check-in', child: [
            { id: 2, name: 'Cek-in Member', url: '/member' },
            { id: 3, name: 'Cek-in Trainer', url: '/trainer' }
        ]
    },
    {
        id: 4, name: 'Trainer', url: '/trainers', child: [
            { id: 5, name: 'Daftar Trainer', url: '/all' }
        ]
    }
];

export default route;