import React from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { FaCloudDownloadAlt } from 'react-icons/fa';


const VideoModal = ({ videoLink, isOpen, setIsOpen, setOpenFun }) => {
    const { auth } = useSelector((store) => store.auth);
    const downloadImage = (url) => {
        saveAs(url, "video.mp4");
    }
    return (
        <div className='fixed inset-0 bg-[#0f172a] h-screen w-screen z-50 flex items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: [1, 0.5, 0], y: [0, -40, 100] }} className='px-4 mx-4 sm:px-8 py-4 bg-white w-full sm:w-[900px] h-auto rounded-xl z-40 shadow-xl '>
                <div className='flex items-center justify-end'>
                    <button onClick={setOpenFun} className='w-10 h-10 flex items-center justify-center mb-2 rounded-full bg-black text-white'>
                        <IoClose size={25} color="#fff" />
                    </button>
                </div>
                <div className='w-full h-full'>
                    {/* <img className='object-contain h-[400px] sm:h-full w-full rounded-xl' src={image} alt={image} /> */}
                    <video className='object-contain h-full max-h-[400px] sm:h-full w-full rounded-xl' poster={videoLink?.image} controls autoPlay>
                        <source src={videoLink?.video_files[1].link} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                </div>
                <div className='flex flex-col sm:flex-row items-start justify-between gap-1 w-full sm:gap-4 py-4'>
                    <div className='flex flex-col items-start gap-2'>
                        <h2 className='text-md text-black font-bold'>{videoLink?.user?.name}</h2>
                        <p className='text-sm text-[#94a3b8] w-full sm:w-[350px]'>{videoLink?.user?.alt}</p>
                    </div>
                    <div className='flex items-center gap-2 w-full justify-end'>
                        {
                            // auth && (
                            //     <>
                            //         <button className='border px-4 py-2 rounded-md text-sm sm:text-lg flex items-center'>
                            //             <BsBookmarks size={22} color='#94a3b8' />
                            //         </button>
                            //     </>
                            // )
                        }
                        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer relative px-2 sm:px-4 py-2 bg-teal-400 text-white items-center text-sm sm:text-lg flex justify-end rounded-md'>
                            <span className='flex justify-end'>Free Download</span>
                            {/* <span className='flex sm:hidden w-[60px] items-center justify-center'><FaCloudDownloadAlt size={22} /></span> */}
                            <span>
                                {
                                    isOpen ? <BiChevronUp size={22} color='#fff' /> : <BiChevronDown size={22} color='#fff' />
                                }
                            </span>
                            {
                                isOpen && (
                                    <div className='absolute left-0 bottom-full mb-2 rounded-lg bg-white border border-slate-300 shadow-lg flex flex-col items-start justify-start w-full text-left  overflow-hidden'>
                                        {

                                            videoLink?.video_files?.map((item, index) => (

                                                <button key={index} onClick={() => downloadImage(item?.link)} className='text-black text-sm outline-none hover:bg-slate-200 hover:text-teal-400 px-4 py-2 w-full text-left gap-2 flex items-center '>
                                                    <span className='text-teal-600 text-md font-bold'>{item?.width} </span> <span className='font-semibold text-xs'>{item?.quality.toUpperCase()}</span>
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

export default VideoModal