const route = [
    {
        id: 1, name: 'Cek-in', url: '/check-in', child: [
            { id: 2, name: 'Cek-in Member', url: '/member' },
            { id: 3, name: 'Cek-in Trainer', url: '/trainer' }
        ]
    },
];

export default route;