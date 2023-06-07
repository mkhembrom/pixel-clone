import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Input, Logo } from '../components/header/widgets'
import { Axios, authAxios } from '../utils/fetcher'
import { useSelector } from 'react-redux'
import PhotoModal from '../components/modal/photoModal'
import { AnimatePresence } from 'framer-motion'

const Me = () => {

    const { auth } = useSelector((store) => store.auth);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [imageData, setImageData] = useState(null);


    // const key = "id";
    // const uniqueData = [...new Map(collectionData.map(item => [item[key], item])).values()];

    // console.log(uniqueData)

    const openPreviewImage = () => {
        setOpen(true);
    }

    const setOpenFun = () => {
        setOpen(false);
    }

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 left-0 bg-white w-full z-20'>
                <div className='text-black z-10 md:container  mx-auto flex items-center justify-between gap-10 p-2 sm:p-4 h-16 sm:h-20 w-full'>
                    <Logo />
                    <div className='hidden sm:flex w-full items-center sm:ml-[40px]'>
                        <Input />
                    </div>
                    <Avatar />
                </div>
                <hr />
            </div>
            <div className='flex flex-col items-center justify-start gap-10 mt-16'>
                <img className='rounded-full w-32 h-32' src={auth?.photo} alt={auth?.name} />
                <h1 className='text-lg sm:text-6xl font-normal'>{auth?.name}</h1>
                {/* <button className='bg-teal-500 text-white rounded-md text-lg sm:text-2xl px-8 py-3'>
                    Edit profile
                </button> */}
            </div>
            <div className='mt-8 sm:mt-16 mx-4 md:container md:mx-auto'>
                <button className='px-8 py-3 rounded-full bg-black text-white'>
                    My Collection
                </button>
            </div>
            <div className='columns-2 sm:columns-5 gap-4 sm:gap-8 my-10 mx-4 md:container md:mx-auto'>
                {
                    imageData && imageData.map((item, index) => (

                        <div key={index} className=' group overflow-hidden mb-8 ' onClick={openPreviewImage}>
                            <div className='relative overflow-hidden z-0 w-full h-full rounded-xl'>
                                <img className=' w-auto h-auto object-cover rounded-xl overflow-hidden' src={item?.src?.large} />
                                <div className='absolute p-4 w-full left-0 right-0 bottom-0 translate-y-[100px] group-hover:translate-y-0 transition-all group-hover:bg-gradient-to-t from-black h-20 rounded-b-xl'>
                                    <p className='text-white'>{item?.photographer}</p>
                                    <p className='text-white text-xs'>{item?.alt}</p>
                                </div>
                            </div>

                            {
                                open && (

                                    <PhotoModal
                                        details={item}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        setOpenFun={setOpenFun} />

                                )
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Me