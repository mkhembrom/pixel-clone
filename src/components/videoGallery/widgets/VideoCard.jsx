import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import VideoModal from '../../modal/videoModal';


const VideoCard = ({ videoLink, isLast, nextPage }) => {

    const imageRef = useRef(null);
    const videoRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!imageRef?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                nextPage();
                observer.unobserve(entry.target)
            }
        },
            {
                rootMargin: "100px",
            }
        );
        observer.observe(imageRef.current);
    }, [imageRef, isLast])

    useEffect(() => {
        const controller = new AbortController();
        if (!videoRef?.current) return;
        videoRef.current.removeAttribute("controls");
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                videoRef.current.play();
            })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                });
        }

        return () => {
            controller.abort();
        }

    }, [])

    const openPreviewImage = () => {
        setOpen(true);
    }

    const setOpenFun = () => {
        setOpen(false);
    }

    return (
        <motion.div

            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}


        >
            <div
                onClick={openPreviewImage}
                className='w-full mb-4 sm:mb-8 h-full cursor-pointer'
                ref={imageRef}
            >

                {
                    videoLink ? <video ref={videoRef} className='object-contain w-full h-auto' controls autoPlay muted>
                        <source src={videoLink?.video_files[3]?.link} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video> : <img className='object-contain w-full h-auto' src={videoLink?.image} alt={videoLink?.id} />
                }
            </div>
            <AnimatePresence>
                {

                    open && (
                        <VideoModal videoLink={videoLink} isOpen={isOpen} setIsOpen={setIsOpen} setOpenFun={setOpenFun} />
                    )
                }

            </AnimatePresence>
        </motion.div >

    )
}

export default VideoCard