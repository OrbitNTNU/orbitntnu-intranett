import React from 'react';
import type { ShortcutLink } from '@/interfaces/ShortcutLink';
import Link from 'next/link';
import { ShortcutType } from '@/mockdata/MockShortcuts';

interface ShortcutProp {
    type: ShortcutType,
    shortcut: ShortcutLink,
}

export const Shortcut = ({ type, shortcut }: ShortcutProp) => {
    return (
        <Link target={type == ShortcutType.EXTERNAL ? '_blank' : ''} href={shortcut.url} className='
        flex flex-col items-center bg-blue-600
        p-4 m-2 rounded-lg w-[280px] hover:bg-blue-800
        '>
            <p className="text-2xl font-bold text-center">
                {shortcut.header}
            </p>
            <p className='align-left text-subtext'>
                {shortcut.description}
            </p>
        </Link>
    )
}