import { Logo, Input, Avatar } from "./widgets"
import { CgMoreO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Axios } from "../../utils/fetcher";
import { resetImageList, resetVideoList, searchFun } from "../../app/features/image/imageSlice";
import { useNavigate } from "react-router-dom";


const Header = ({ search }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((store) => store.images);
    const [images, setImages] = useState([]);

    const fetchCuratedImages = async () => {
        const { data } = await Axios.get('/v1/curated', {
            params: {
                page: 1,
                per_page: 10
            }
        });
        const { photos } = data;
        setImages(photos);
    }

    useEffect(() => {
        fetchCuratedImages()
    }, [])

    const handleJumpClick = (txt) => {
        dispatch(searchFun(txt));
        dispatch(resetImageList());
        dispatch(resetVideoList());

        if (!isLoading) {
            navigate('/detail');
        }
    }

    return (
        <>
            <div className={`relative w-full h-[500px] overflow-hidden`}>
                <div className='text-white z-10 md:container mx-auto flex items-center justify-between h-16  sm:h-20 w-full px-4'>
                    <Logo />
                    {search && <Input />}
                    <Avatar />
                </div>
                <div className='w-full max-w-[600px] my-24 mx-auto '>
                    <h1 className='my-6 sm:text-start px-4 sm:px-0 text-center text-lg sm:text-3xl text-white tracking-tighter'>The best free stock photos, royalty free images & videos shared by creators.</h1>
                    <Input />
                    <div className='flex items-center my-4 text-md gap-2 mx-4 sm:mx-0 flex-wrap'>
                        <p className='drop-shadow-md font-bold text-grey-200'>Trending</p>
                        <button onClick={() => handleJumpClick('jungle')} className='text-md text-white hover:text-slate-300'>jungle,</button>
                        <button onClick={() => handleJumpClick('nature')} className='text-md text-white hover:text-slate-300'>nature,</button>
                        <button onClick={() => handleJumpClick('beautiful')} className='text-md text-white hover:text-slate-300'>beautiful,</button>
                        <button onClick={() => handleJumpClick('car')} className='text-md text-white hover:text-slate-300'>car,</button>
                        <button className='text-md text-white hover:text-slate-300'>
                            <CgMoreO size={20} color='#fff' />
                        </button>
                    </div>
                </div>
                <div className="-z-10 absolute top-0 left-0 right-0 bottom-0 ">
                    <img className='w-full object-cover h-full brightness-50' src={images[4]?.src?.original} alt="header_image" />
                </div>
            </div>
        </>
    )
}

export default Header