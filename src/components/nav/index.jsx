import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPhoto, setVideo } from '../../app/features/image/imageSlice';

const Nav = () => {

    const dispatch = useDispatch();
    const { isVideo, isPhoto } = useSelector((store) => store.images);
    const [textValue, setTextValue] = useState("");
    const navBtn = [
        { id: 1, link: "/home", text: "Photos" },
        { id: 2, link: "/videos", text: "Videos" },
    ];

    useEffect(() => {
        if (isVideo) {
            setTextValue("Videos")
        } else if (isPhoto) {
            setTextValue("Photos")
        }
    }, [isVideo, isPhoto]);

    const handleClick = (txt) => {
        setTextValue(txt);
        if (txt === "Videos") {
            dispatch(setVideo())

        } else if (txt === "Photos") {
            dispatch(setPhoto())
        }
    }

    return (
        <div className='flex items-center justify-center gap-2 my-6'>
            {
                navBtn.map((item) => (
                    <button onClick={() => handleClick(item.text)} key={item.id} className={`${textValue === item.text ? 'text-white bg-black' : 'text-black'}` + ' text-black transition-all duration-300 ease-in-out hover:text-white text-center hover:bg-black rounded-full  px-4 py-3'}>{item.text}</button>
                ))
            }
        </div>
    )
}

export default Nav