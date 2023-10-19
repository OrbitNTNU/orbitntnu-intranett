import React from 'react';
import { MemeInfo } from '@/interfaces/MemeInfo';

export const Meme = ({meme, creator, date}: MemeInfo) => {
    return (
        <div className='m-4 p-4'>
            <img src={meme.src} className='w-[350px] rounded-lg'/>
            <p>
                By: {creator}
            </p>
            <p className='text-gray-400'>
                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
            </p>
        </div>
    )
}