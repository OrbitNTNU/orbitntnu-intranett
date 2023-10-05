import React from 'react';
import { Memes } from '@/views/Memes';
import memes from '@/mockdata/MockMemes';

const memegallery = () => {

    return (
        <div className='flex flex-col items-center bg-primaryColor text-white'>
            <h1>
                Meme-gallery
            </h1>
            {/* TODO */}
            <hr className='border-t-4 bg-gradient-to-r from-primaryColor via-accentColorOne to-primaryColor'/>
            <Memes memes={memes}/>
        </div>
    );

}

export default memegallery;