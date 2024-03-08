import React from 'react';
import type { MemeInfo } from '@/interfaces/MemeInfo';
import Image from 'next/image';

export const Meme = ({meme, creator, date}: MemeInfo) => {
    return (
        <div className='m-4 p-4 rounded-lg bg-secondaryColorOne'>
            <Image src={meme.src} width={350} height={350} alt={''}/>
            <p>
                By: {creator}
            </p>
            <p className='text-gray-400'>
                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
            </p>
        </div>
    )
}