import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { RiVideoLine } from "react-icons/ri";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetImageList, resetVideoList, searchFun, setPhoto, setVideo } from '../../../app/features/image/imageSlice';

const Input = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectBtn, setSelectBtn] = useState("Photos");
    const [name, setName] = useState("");
    const { isLoading, isVideo, isPhoto } = useSelector((store) => store.images);


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetImageList());
        dispatch(resetVideoList());

        if (!isLoading) {
            dispatch(searchFun(name));
            navigate("/detail");
        }
        setName("")

    }

    const selectOption = [
        { id: 1, icon: MdOutlinePhotoSizeSelectActual, labelText: "Photos" },
        { id: 2, icon: RiVideoLine, labelText: "Videos" },
    ]

    const btnRef = useRef(null);

    const handlePopUp = (e) => {
        if (e.target !== btnRef.current) {
            if (e.target !== btnRef.currentTarget) {
                setIsOpen(false)
            }
        }
    }

    useEffect(() => {

        window.addEventListener('click', handlePopUp, false);

        return () => {
            window.removeEventListener('click', handlePopUp, false);
        };
    }, [isOpen, selectBtn]);

    useEffect(() => {
        if (isVideo) {
            setSelectBtn("Videos")

        } else if (isPhoto) {
            setSelectBtn("Photos")
        }
    }, [isVideo, isPhoto])

    const handleClick = (txt) => {
        setSelectBtn(txt)

        if (txt === "Videos") {
            dispatch(setVideo());
        } else if (txt === "Photos") {
            dispatch(setPhoto());
        }
    }

    return (
        <div className='sm:max-w-[700px] w-full relative text-black px-4 sm:px-0'>
            <button ref={btnRef} onClick={() => setIsOpen(!isOpen)} className='p-2 sm:p-4 w-[120px] ml-4 sm:ml-0 text-black flex items-center bg-slate-100 absolute left-0 top-1/2 -translate-y-1/2 rounded-l-lg outline-none' name="select-serach" id="serach">
                {selectBtn}
                <span className='ml-2 items-center'>
                    {
                        isOpen ? <BiChevronUp size={22} color='#94a3b8' /> : <BiChevronDown size={22} color='#94a3b8' />
                    }
                </span>

            </button>
            <form onSubmit={handleSubmit} className='w-full'>
                <input className='p-2 sm:p-4 pl-[120px] sm:pl-[120px] bg-slate-100 rounded-lg outline-none w-full' placeholder='Search for free photo' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </form>
            <div className='hidden sm:flex absolute top-1/2 right-4 items-center -translate-y-1/2 hover:text-teal-400 cursor-pointer transition-colors ease-in duration-200'>
                <HiOutlineSearch size={25} />
            </div>

            {
                isOpen && (
                    <div className='ml-4 sm:ml-0  absolute left-0 top-full mt-2 rounded-lg bg-white border border-slate-300 w-[120px] z-50 overflow-hidden '>
                        {
                            selectOption.map((item) => (
                                <button onClick={() => handleClick(item.labelText)} key={item.id} className='text-grey-200 outline-none hover:bg-slate-200 hover:text-teal-400 px-2 sm:px-4 py-1 sm:py-2 w-full flex items-center gap-2'>
                                    <span className=''><item.icon size={20} /></span>
                                    {item.labelText}
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Input