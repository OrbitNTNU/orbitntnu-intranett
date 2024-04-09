import type { ShortcutLink } from "@/interfaces/ShortcutLink"

export interface ShortcutsProps {
    type: ShortcutType,
    shortcuts: ShortcutLink[]
}

export enum ShortcutType {
    INTERNAL = 'Internal',
    EXTERNAL = 'External',
}

const mockShortcuts: ShortcutsProps[] = [
    {
        type: ShortcutType.INTERNAL,
        shortcuts: [
            {
                header: 'Your profile',
                description: 'Check out your profile',
                url: '/profile/me'
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
                header: 'Orbit Teams',
                description: 'Explore the teams in Orbit',
                url: '/team/teamlist',
            },
            {
                header: 'Your team',
                description: 'See your own team',
                url: '/team/find',
            }
        ],
    },
    {
        type: ShortcutType.EXTERNAL,
        shortcuts: [
            {
                header: 'Contact HR',
                description: 'Contact HR here',
                url: 'https://forms.gle/f9J3YDGXo5tU4W6b7',
            },
            {
                header: 'Board Feedback',
                description: 'Give feedback to the board',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSd_EKTsfqqxvPbNl_N8NFASLRZIN_t80nSxuUVTwb-xbcoGmw/viewform?usp=sf_link',
            },
            {
                header: 'Confluence',
                description: 'Find documentation',
                url: 'https://wiki.orbitntnu.com'
            },
            {
                header: 'Vaultwarden',
                description: 'Store your passwords safely',
                url: 'https://passwords.orbitntnu.com'
            },
            {
                header: 'Orbit NTNU Website',
                description: 'Check out Orbit\'s website',
                url: 'https://orbitntnu.com'
            },
            {
                header: 'Orbit Documentation',
                description: 'View Documentation in Orbit',
                url: 'https://docs.orbitntnu.com'
            },
        ]
    }
]

export default mockShortcuts;