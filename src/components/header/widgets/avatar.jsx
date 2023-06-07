import React, { useEffect, useRef, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { authAxios } from '../../../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../app/features/auth/authSlice';
// import dotenv from "dotenv";
// dotenv.config();

const Avatar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const selectRef = useRef(null);
    const { auth } = useSelector((store) => store.auth);
    const handleMouseOver = (e) => {
        if (e.target !== selectRef.current) {
            if (e.target !== selectRef.currentTarget) {
                setIsOpen(false)
            }
        }
    }

    useEffect(() => {

        window.addEventListener('click', handleMouseOver, false);

        return () => {
            window.removeEventListener('click', handleMouseOver, false);
        };
    }, [isOpen]);

    // const fetchUser = async () => {
    //     const { data } = await authAxios.get("/auth/login/success");
    //     if (data) {
    //         dispatch(getUser(data?.user));
    //     }
    // }



    // useEffect(() => {
    //     fetchUser();
    // }, [dispatch]);



    const logout = async () => {
        window.open(`${process.env.REACT_APP_API_CLIENT}/auth/logout`, "_self");
    }

    return (
        <div className='flex items-center relative '>
            {/* {
                !auth ? <Link to="/login" className='flex outline-none items-center bg-gray-200 px-4 py-2 text-black rounded-md'>Login</Link> :
                    <img ref={selectRef} onClick={auth ? () => setIsOpen(!isOpen) : undefined} src={auth?.photo} alt="avatar" className='cursor-pointer w-12 object-cover rounded-full' />


            } */}

            {
                isOpen && (
                    <div className='absolute right-[0%] shadow-2xl top-full mt-2 rounded-lg bg-white border border-slate-300  overflow-hidden w-[200px] sm:w-[150px]'>


                        <Link to="/me" className='text-black text-lg sm:text-sm outline-none hover:bg-slate-200 hover:text-teal-400 px-4 py-4 sm:py-2 w-full flex items-center gap-2'>
                            Your Profile
                        </Link>
                        <Link to="/me" className='text-black text-lg sm:text-sm outline-none hover:bg-slate-200 hover:text-teal-400 px-4 py-4 sm:py-2 w-full flex items-center gap-2'>
                            Your Collections
                        </Link>
                        <button onClick={logout} className='text-black text-lg sm:text-sm outline-none hover:bg-slate-200 hover:text-teal-400 px-4 py-4 sm:py-2 w-full flex items-center gap-2'>
                            Logout
                        </button>



                    </div>
                )
            }
        </div>
    )
}

export default Avatar