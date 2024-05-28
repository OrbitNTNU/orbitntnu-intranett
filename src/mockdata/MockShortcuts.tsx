import Icons from "@/components/General/Icons";
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
                url: '/profile/me',
                icon: <Icons name='Profile'/>
            },
            {
                header: 'Search for Orbiter',
                description: 'Search for your friends',
                url: '/search',
                icon: <Icons name='Search'/>
            },
            {
                header: 'Orbit Teams',
                description: 'Explore the teams in Orbit',
                url: '/teams',
                icon: <Icons name='Teams'/>
            },
            {
                header: 'Your team',
                description: 'See your own team',
                url: '/team/find',
                icon: <Icons name='Team'/>
            },
            {
                header: 'Calendar',
                description: 'Check out Orbit events',
                url: '/calendar',
                icon: <Icons name='Calendar'/>
            },
            {
                header: 'Announcements',
                description: 'Announcements from Orbit',
                url: '/announcements',
                icon: <Icons name='Bell'/>
            },
            {
                header: 'Time machine',
                description: 'View earlier Orbit teams',
                url: '/legacy',
                icon: <Icons name='Clock'/>
            },
            {
                header: 'Meme gallery',
                description: 'Our digital meme page',
                url: '/memegallery',
                icon: <Icons name='Memes'/>
            },
            {
                header: 'Insights',
                description: 'View Orbit Statistics',
                url: '/statistics',
                icon: <Icons name='Statistics'/>
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
                header: 'Documentation',
                description: 'View Documentation in Orbit',
                url: 'https://docs.orbitntnu.com'
            },
            {
                header: 'Notion',
                description: "Access Orbit's Notion",
                url: 'https://www.notion.so/Home-3fa65bc83ba04164b60c8fa7ae99840b'
            },
        ]
    }
]

export default mockShortcuts;