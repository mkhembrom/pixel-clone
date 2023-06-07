import React from 'react'
import Header from '../components/header';
import Nav from '../components/nav';
import Gallery from '../components/gallery';
import { useSelector } from 'react-redux';
import VideoGallery from '../components/videoGallery';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    return <div className='fixed inset-0 flex items-center justify-center'>
        <PulseLoader color='#2dd4bf' />
    </div>
}

const HomePage = () => {

    const { isVideo, isPhoto } = useSelector((store) => store.images);


    return (
        <div className={``}>

            <Header />
            <Nav />


            {
                isPhoto && <Gallery />
            }

            {
                isVideo && <VideoGallery />
            }

        </div>
    )
}

export default HomePage