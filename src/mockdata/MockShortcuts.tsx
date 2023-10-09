import { ShortcutLink } from "@/interfaces/ShortcutLink"

const mockShortcuts: ShortcutLink[] = [
    {
        header: 'Your profile',
        description: 'Check out your profile',
        url: '/'
    },
    {
        header: 'Contact HR',
        description: 'Contact HR here',
        url: 'https://forms.gle/L7Kpnzb9w2qRa9Bx5',
    },
    {
        header: 'Calender',
        description: 'Check out Orbit events',
        url: '/',
    },
    {
        header: 'Search for Orbiter',
        description: 'Search for your friends',
        url: '/searchpage',
    },
    {
        header: 'Announcements',
        description: 'Announcements from Board',
        url: '/announcements',
    },
    {
        header: 'Blog',
        description: 'What is Orbit up to lately?',
        url: '/',
    },
    {
        header: 'Legacy page',
        description: 'View earlier Orbit teams',
        url: '/',
    },
    {
        header: 'Meme gallery',
        description: 'Check out our digital meme page',
        url: '/memegallery',
    }
]

export default mockShortcuts;