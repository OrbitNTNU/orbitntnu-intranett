import React from 'react';
import { Meme } from '@/components/MemePage/Meme';
import type { MemeInfo } from '@/interfaces/MemeInfo';

interface MemesProps {
    memes: MemeInfo[];
}

export const Memes = ({memes}: MemesProps) => {
    return (
        <div className='flex flex-row justify-center flex-wrap max-w-[1300px]'>
            {memes ? memes.map((meme) => (
                <Meme key={String(meme.date)} meme={meme.meme} creator={meme.creator} date={meme.date}/>
            ))
            :
            null}
        </div>
    )
}