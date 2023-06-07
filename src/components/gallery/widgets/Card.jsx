import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import PhotoModal from '../../modal/photoModal';


const Card = ({ isLast, nextPage, details, notOpen }) => {

    const imageRef = useRef(null);
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

    const openPreviewImage = () => {
        setOpen(true);
    }

    const setOpenFun = () => {
        setOpen(false);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                onClick={!notOpen && openPreviewImage}
                className='w-full mb-4 sm:mb-8 h-full cursor-pointer hover:bg-black hover:brightness-75 transition'
            >
                <img ref={imageRef} className={`${notOpen ? 'object-cover h-full' : ' object-contain w-full h-auto'}`} src={details?.src?.large} alt={details?.id} />
            </div>

            <AnimatePresence>
                {
                    open && (
                        <PhotoModal
                            details={details}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setOpenFun={setOpenFun} />
                    )
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default Card