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
                url: '/search',
            },
            {
                header: 'Announcements',
                description: 'Announcements from Orbit',
                url: '/announcements',
            },
            {
                header: 'Time machine',
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
                url: '/teams',
            },
            {
                header: 'Your team',
                description: 'See your own team',
                url: '/team/find',
            },
            {
                header: 'Insights',
                description: 'View Orbit Statistics',
                url: '/statistics',
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
            {
                header: 'Orbit Notion',
                description: "Access Orbit's Notion",
                url: 'https://www.notion.so/Home-3fa65bc83ba04164b60c8fa7ae99840b'
            },
        ]
    }
]

export default mockShortcuts;