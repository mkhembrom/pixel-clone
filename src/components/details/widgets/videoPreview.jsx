import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchVideo } from '../../../app/features/image/imageApi';
import VideoCard from '../../videoGallery/widgets/VideoCard';
import { setPhoto, setVideo } from '../../../app/features/image/imageSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VideoPreview = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const txt = searchParams.get('query');
    const { videoList, searchText, isVideo, isPhoto } = useSelector((store) => store.images);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        dispatch(fetchSearchVideo({ query: searchText === '' ? txt : searchText, page, per_page: perPage }));
        navigate(`/detail?query=${searchText === '' ? txt : searchText}`);
    }, [dispatch, searchText, page, txt]);

    const key = "id";
    const uniqueData = [...new Map(videoList.map(item => [item[key], item])).values()];

    const nextPage = () => {
        setPage(page + 1);
    }

    return (
        <div className='w-full mt-8 sm:mt-16 mb-10 px-4'>
            <h1 className='text-lg sm:text-5xl font-medium tracking-tight	'>Free {searchText.charAt(0).toUpperCase() + searchText.slice(1)} Videos</h1>
            <div className='flex items-center justify-between my-8'>
                <div className='flex items-center gap-4'>
                    <button onClick={() => dispatch(setPhoto())} className={`${isPhoto ? 'text-white bg-black' : 'text-black'}` + '  hover:bg-black hover:text-white text-lg rounded-full px-4 py-2 transition-all ease-in duration-300'}>Photos</button>
                    <button onClick={() => dispatch(setVideo())} className={`${isVideo ? 'text-white bg-black' : 'text-black'}` + '  hover:bg-black hover:text-white text-lg rounded-full px-4 py-2 transition-all ease-in duration-300'}>Videos</button>
                </div>
            </div>

            <div className='columns-1 sm:columns-3 gap-4 sm:gap-8'>
                <AnimatePresence>
                    {
                        uniqueData.map((item, index) => (
                            <VideoCard key={index} videoLink={item} isLast={index === uniqueData.length - 1} nextPage={nextPage} />
                        ))
                    }
                </AnimatePresence>

            </div>
        </div>
    )
}

export default VideoPreview