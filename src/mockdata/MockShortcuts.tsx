import type { ShortcutLink } from "@/interfaces/ShortcutLink"

const mockShortcuts: ShortcutLink[] = [
    {
        header: 'Your profile',
        description: 'Check out your profile',
        url: '/profile/me'
    },
    {
        header: 'Contact HR',
        description: 'Contact HR here',
        url: 'https://forms.gle/f9J3YDGXo5tU4W6b7',
    },
    {
        header: 'Calendar',
        description: 'Check out Orbit events',
        url: '/calendar',
    },
    {
        header: 'Search for Orbiter',
        description: 'Search for your friends',
        url: '/searchpage',
    },
    {
        header: 'Announcements',
        description: 'Announcements from Orbit',
        url: '/announcements',
    },
    {
        header: 'Legacy page',
        description: 'View earlier Orbit teams',
        url: '/legacy',
    },
    {
        header: 'Meme gallery',
        description: 'Check out our digital meme page',
        url: '/memegallery',
    },
    {
        header: 'Link tree',
        description: 'Find a useful link',
        url: '/links',
    },
    {
        header: 'Board Feedback',
        description: 'Give feedback to the board',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSd_EKTsfqqxvPbNl_N8NFASLRZIN_t80nSxuUVTwb-xbcoGmw/viewform?usp=sf_link',
    }
]

export default mockShortcuts;