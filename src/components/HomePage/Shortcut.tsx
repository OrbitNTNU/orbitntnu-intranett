import React from 'react';
import type { ShortcutLink } from '@/interfaces/ShortcutLink';

export const Shortcut = ({ header, description, url }: ShortcutLink) => {
    return (
        <a href={url} className='
        flex flex-col items-center bg-blue-600
        p-4 m-2 rounded-lg w-[280px] hover:bg-blue-800
        '>
            <p className="text-2xl font-bold text-center">
                {header}
            </p>
            <p className='align-left text-subtext'>
                {description}
            </p>
        </a>
    )
}