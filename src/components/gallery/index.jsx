import React, { useEffect, useState } from 'react'
import Card from './widgets/Card'
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { fetchImage } from '../../app/features/image/imageApi';

const Gallery = () => {

    const { imageList } = useSelector((store) => store.images);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const dispatch = useDispatch();
    const nextPage = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        dispatch(fetchImage({ page, per_page: perPage }));
    }, [dispatch, page]);

    const key = "id";
    const uniqueData = [...new Map(imageList.map(item => [item[key], item])).values()];

    return (
        <div className='md:container mx-auto p-4 sm:p-8 pt-4'>
            <div className='flex items-center justify-between mb-10'>
                <h1 className='text-lg sm:text-2xl'>Free Stock Photos</h1>
                <button className='hidden'>Trending</button>
            </div>

            <div className='columns-2 sm:columns-3 gap-4 sm:gap-8'>
                <AnimatePresence>
                    {

                        uniqueData.map((image, index) => (
                            <Card
                                key={index}

                                details={image}
                                isLast={index === uniqueData.length - 1}
                                nextPage={nextPage} />
                        ))
                    }
                </AnimatePresence>

            </div>
        </div>
    )
}

export default Gallery