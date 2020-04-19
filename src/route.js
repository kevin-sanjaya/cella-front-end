const route = [
    {
        id: 1, name: 'Cek-in', url: '/check-in', child: [
            { id: 2, name: 'Cek-in Member', url: '/member' },
            { id: 3, name: 'Cek-in Trainer', url: '/trainer' },
            { id: 4, name: 'Kontrol Daftar Cek-in', url: '/control' }
        ]
    },
    {
        id: 8, name: 'Member', url: '/members', child: [
            { id: 9, name: 'Data Member Aktif', url: '/all' },
            { id: 10, name: 'Daftar Member Baru', url: '/new' },
            { id: 11, name: 'Perpanjang Membership Gym', url: '/extend' }
        ]
    },
    {
        id: 12, name: 'Trainer', url: '/trainers', child: [
            { id: 13, name: 'Data Trainer Aktif', url: '/all' }
        ]
    },
    {
        id: 5, name: 'Keamanan', url: '', child: [
            { id: 6, name: 'Jadwal Acara', url: '/event' },
            { id: 7, name: 'CCTV Gym', url: '/cctv' },
            { id: 16, name: 'Kontak Darurat', url: '/contact' }
        ]
    },
    {
        id: 14, name: 'Laporan', url: '/lost', child: [
            { id: 15, name: 'Laporan Kehilangan', url: '' }
        ]
    }
];

export default route;