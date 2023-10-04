import React from 'react';
import { ShortcutLink } from '@/interfaces/ShortcutLink';

export const Shortcut = ({ header, description, url }: ShortcutLink) => {
    return (
        <a href={url} className='
        flex flex-col items-start bg-secondaryColorTwo
        p-4 m-2 rounded-lg w-[280px] hover:bg-[#211932]
        '>
            <p className="text-2xl font-bold">
                {header}
            </p>
            <p className='align-left'>
                {description}
            </p>
        </a>
    )
}