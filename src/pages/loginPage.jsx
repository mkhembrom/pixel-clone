import React, { useEffect } from 'react'
import Card from '../components/gallery/widgets/Card'
import { useDispatch, useSelector } from 'react-redux';
import { fetchImage } from '../app/features/image/imageApi';
import { AiOutlineGoogle } from "react-icons/ai";

const LoginPage = () => {

    const dispatch = useDispatch();
    const { imageList } = useSelector((store) => store.images);

    useEffect(() => {
        dispatch(fetchImage({ page: 1, per_page: 20 }));
    }, [dispatch]);

    const googleBtn = () => {
        window.open("http://localhost:8080/auth/google", "_self");
    }

    return (
        <div className='relative h-screen'>

            <div className='fixed inset-0 grid place-items-center z-50'>
                <div className='bg-white p-4 rounded-xl shadow-xl text-center'>
                    <button onClick={googleBtn} className='rounded-xl bg-blue-600 text-white px-8 py-3 flex items-center hover:bg-blue-700'><span className='mr-2'><AiOutlineGoogle size={25} /></span>Google Login</button>
                </div>
            </div>
            <div className=' mx-auto fixed inset-0 brightness-50	h-screen'>
                <div className='grid grid-cols-3  md:grid-cols-4  grid-rows-4'>

                </div>
            </div>
        </div>
    )
}

export default LoginPage