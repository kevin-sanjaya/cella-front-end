const route = [
    {
        id: 1, name: 'Cek-in', url: '/check-in', child: [
            { id: 2, name: 'Cek-in member', url: '/member' },
            { id: 3, name: 'Cek-in trainer', url: '/trainer' },
            { id: 4, name: 'Kontrol daftar cek-in', url: '/control' }
        ]
    },
    {
        id: 8, name: 'Member', url: '/members', child: [
            { id: 9, name: 'Data member aktif', url: '/all' },
            { id: 10, name: 'Daftar member baru', url: '/new' },
            { id: 11, name: 'Perpanjang member', url: '/extend' }
        ]
    },
    {
        id: 12, name: 'Trainer', url: '/trainers', child: [
            { id: 13, name: 'Data trainer aktif', url: '/all' }
        ]
    },
    {
        id: 5, name: 'Keamanan', url: '', child: [
            { id: 7, name: 'Kamera CCTV', url: '/security-cctv' },
            { id: 16, name: 'Kontak darurat', url: '/emergency-contact' }
        ]
    },
    {
        id: 14, name: 'Laporan', url: '', child: [
            { id: 15, name: 'Laporan kehilangan', url: '/report' }
        ]
    }
];

export default route;