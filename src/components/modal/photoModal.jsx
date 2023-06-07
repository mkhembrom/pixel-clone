import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import { FaCloudDownloadAlt, FaRegHeart } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { saveBookmark } from '../../app/features/image/imageSlice';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { authAxios } from '../../utils/fetcher';


const PhotoModal = ({ details, isOpen, setIsOpen, setOpenFun }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store.auth);
    const [bclick, setBclick] = useState(false);

    // const fetchCollection = async () => {

    //     const { data } = await authAxios.get(`${process.env.REACT_APP_API_CLIENT}/collection/`);
    //     const filterIds = data?.data.map((item) => item.photo_id);
    //     const bc = filterIds.includes(details?.id.toString());
    //     setBclick(bc);

    // }

    // const fetchCollections = async () => {
    //     const { data: collection } = await authAxios.get("/collection/currentCollection");
    //     if (!collection) {
    //         if (auth) {
    //             await authAxios.post(`${process.env.REACT_APP_API_CLIENT}/collection/saveCollection`, {
    //                 authorId: auth?.id
    //             });
    //         }
    //     }
    // }


    // useEffect(() => {
    //     // if (auth) {
    //     // fetchCollection()
    //     fetchCollections()
    //     // }
    // }, [])

    const handleBookmark = async (photo) => {

        const { data } = await authAxios.get("/collection/currentCollection");

        console.log(data);

        if (data) {
            const savePhoto = await authAxios.post(`${process.env.REACT_APP_API_CLIENT}/collection/savePhoto`, {
                image: photo?.id.toString(),
                title: photo?.photographer,
                description: photo?.alt,
                collectionId: data?.id
            });
            setBclick(true);
        }

    }

    const downloadImage = (url) => {
        saveAs(url, "image.jpg");
    }
    return (
        <div className='fixed inset-0 bg-[#0f172a] h-screen w-screen z-50 flex items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: [1, 0.5, 0], y: [0, -40, 100] }}

                className='px-4 mx-4 sm:px-8 py-4 bg-white w-full sm:w-[900px] h-auto rounded-xl z-40 shadow-xl '>
                <div className='flex items-center justify-end'>
                    <button onClick={setOpenFun} className='w-10 h-10 flex items-center justify-center mb-2 rounded-full bg-black text-white'>
                        <IoClose size={25} color="#fff" />
                    </button>
                </div>
                <div className='w-full h-full'>
                    <img className='object-contain sm:h-[500px] w-full rounded-xl' src={details?.src.large} alt={details?.id} />
                </div>
                <div className='flex flex-col sm:flex-row items-start justify-between gap-1 w-full sm:gap-4 py-4'>
                    <div className='flex flex-col items-start gap-2'>
                        <h2 className='text-md text-black font-bold'>{details?.photographer}</h2>
                        <p className='text-sm text-[#94a3b8] w-full sm:w-[350px]'>{details?.alt}</p>
                    </div>
                    <div className='flex items-center gap-2 w-full justify-end'>
                        {
                            auth && (<>
                                <button onClick={auth ? () => handleBookmark(details) : undefined} className={`${bclick ? 'bg-red-600' : ''}` + ' border px-4 py-2 rounded-md text-sm sm:text-lg flex items-center'}>
                                    <BsBookmarks size={26} color={bclick ? '#fff' : '#94a3b8'} />
                                </button>
                            </>
                            )}
                        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer relative px-2 sm:px-4 py-2 bg-teal-400 text-white items-center text-sm sm:text-lg flex rounded-md'>
                            {
                                !auth ? <span className='flex'>Free Download</span> : (
                                    <>
                                        <span className='hidden sm:flex'>Free Download</span>
                                        <span className='flex sm:hidden w-[60px] items-center justify-center'><FaCloudDownloadAlt size={22} /></span>
                                    </>
                                )
                            }
                            <span>
                                {
                                    isOpen ? <BiChevronUp size={22} color='#fff' /> : <BiChevronDown size={22} color='#fff' />
                                }
                            </span>
                            {
                                isOpen && (
                                    <div className='absolute left-0 bottom-full mb-2 rounded-lg bg-white border border-slate-300 shadow-lg flex flex-col items-start justify-start w-full text-left  overflow-hidden'>

                                        {

                                            Object.entries(details?.src).map(([item, url], index) => (

                                                <button key={index} onClick={() => downloadImage(url)} className='text-black text-sm outline-none hover:bg-slate-200 hover:text-teal-400 px-4 py-2 w-full text-left gap-2'>
                                                    <span className='text-teal-600 text-sm font-semibold'> {item}</span>
                                                </button>
                                            ))
                                        }


                                    </div>
                                )
                            }
                        </div>


                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default PhotoModal