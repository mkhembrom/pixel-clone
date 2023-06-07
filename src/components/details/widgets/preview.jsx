import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Card from '../../gallery/widgets/Card'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchImage } from '../../../app/features/image/imageApi';
import { setPhoto, setVideo } from '../../../app/features/image/imageSlice';
import { useNavigate, useRoutes, useSearchParams } from 'react-router-dom';

const Preview = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const txt = searchParams.get('query');
    const { imageList, searchText, isLoading, page: initilaPage, isPhoto, isVideo } = useSelector((store) => store.images);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        dispatch(fetchSearchImage({ query: searchText === '' ? txt : searchText, page, per_page: perPage }));
        navigate(`/detail?query=${searchText === '' ? txt : searchText}`);
    }, [dispatch, searchText, page, txt]);


    const key = "id";
    const uniqueData = [...new Map(imageList.map(item => [item[key], item])).values()];

    const nextPage = () => {
        setPage(page + 1);
    }

    return (
        <div className='w-full mt-8 sm:mt-16 mb-10 px-4'>
            <h1 className='text-lg sm:text-5xl font-medium tracking-tight	'>Free {searchText.charAt(0).toUpperCase() + searchText.slice(1)} Photos</h1>
            <div className='flex items-center justify-between my-8'>
                <div className='flex items-center gap-4'>
                    <button onClick={() => dispatch(setPhoto())} className={`${isPhoto ? 'text-white bg-black' : 'text-black'}` + '  hover:bg-black hover:text-white text-lg rounded-full px-4 py-2 transition-all ease-in duration-300'}>Photos</button>
                    <button onClick={() => dispatch(setVideo())} className={`${isVideo ? 'text-white bg-black' : 'text-black'}` + '  hover:bg-black hover:text-white text-lg rounded-full px-4 py-2 transition-all ease-in duration-300'}>Videos</button>
                </div>
            </div>

            <div className='columns-2 sm:columns-3 gap-4 sm:gap-8'>
                <AnimatePresence>
                    {
                        uniqueData.map((image, index) => (

                            <Card
                                key={index}
                                details={image} isLast={index === uniqueData.length - 1} nextPage={nextPage} />

                        ))
                    }
                </AnimatePresence>

            </div>
        </div>
    )
}

export default Preview