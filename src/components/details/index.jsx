import React from 'react'
import { Preview, ScrollButton } from './widgets'
import { useSelector } from 'react-redux'
import VideoPreview from './widgets/videoPreview';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    return <div className='fixed inset-0 flex items-center justify-center'>
        <PulseLoader color='#2dd4bf' />
    </div>
}

const Details = () => {



    const { isVideo, isPhoto, isLoading } = useSelector((store) => store.images);
    return (
        <div className='w-full md:container mx-auto relative overflow-hidden'>
            <ScrollButton />

            {
                isLoading && <Loading />
            }
            {

                isPhoto && <Preview />
            }

            {
                isVideo && <VideoPreview />
            }

        </div>
    )
}

export default Details