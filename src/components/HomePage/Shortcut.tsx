import React from 'react';
import Link from 'next/link';
import { ShortcutType } from '@/mockdata/MockShortcuts';
import type { ShortcutLink } from '@/interfaces/ShortcutLink';
import Icons from '../General/Icons';

interface ShortcutProp {
    type: ShortcutType;
    shortcut: ShortcutLink;
}

export const Shortcut = ({ type, shortcut }: ShortcutProp) => {
    const isExternal = type === ShortcutType.EXTERNAL;

    return (
        <Link
            target={isExternal ? '_blank' : ''}
            href={shortcut.url}
            className={`
                flex flex-col justify-between items-start 
                p-4 m-2 rounded-lg w-full sm:w-50 md:w-64 lg:w-64 transition-all duration-300
                ${isExternal ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}
                shadow-lg hover:shadow-2xl hover:translate-y-0.5
            `}
        >
            <div className="w-full mb-2 flex items-center justify-between">
                <div className="flex items-center">
                    {shortcut.icon && (
                        <div className="mr-2">
                            {shortcut.icon}
                        </div>
                    )}
                    <h2 className="text-xl font-bold text-white">{shortcut.header}</h2>
                </div>
                {isExternal && (
                    <span className="text-gray-200 text-sm">(External)</span>
                )}
            </div>
            <div className="w-full flex flex-row">
                <p className="text-gray-100 text-sm w-2/3">
                    {shortcut.description}
                </p>
                <div className="flex justify-end items-center w-1/3 y-0">
                    {isExternal && (
                        <Icons name="ArrowCircleRight" />
                    )}
                </div>
            </div>
        </Link>
    );
};
