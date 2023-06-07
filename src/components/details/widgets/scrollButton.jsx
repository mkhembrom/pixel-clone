import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { resetImageList, resetVideoList, searchFun } from "../../../app/features/image/imageSlice";
import { useSearchParams } from "react-router-dom";

const ScrollButton = () => {

    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store) => store.images);
    const [searchParams, setSearchParams] = useSearchParams();
    const txt = searchParams.get('query');
    const [ttag, setTtag] = useState('');

    const moveLeft = () => {
        scrollRef.current.scrollLeft -= 500;
    }
    const moveRight = () => {
        scrollRef.current.scrollLeft += 500;
    }

    const tags = [
        "kitty",
        "coffee",
        "love",
        "sea",
        "art",
        "abstract",
        "sky",
        "nature",
        "illustration",
        "dog",
        "flowers",
        "cats",
        "4k",
        "japan",
        "food",
        "baby",
        "girl",
        "city",
        "cute",
    ]

    // useEffect(() => {
    //     setTtag(tags[txt]);
    // }, [txt])

    const handleSearch = (tag) => {

        dispatch(resetImageList());
        dispatch(resetVideoList());

        if (!isLoading) {
            dispatch(searchFun(tag));
        }
    }


    return (
        <div className=' flex items-center gap-2 sm:gap-4 w-full my-4 px-2 sm:px-4'>
            <button className='px-2 sm:px-4 py-2' onClick={moveLeft}>
                <BiChevronLeft size={30} />
            </button>
            <div ref={scrollRef} className="scrollbar-hide flex items-center gap-2 sm:gap-4 w-full overflow-auto scroll-smooth snap-start">
                {
                    tags.map((tag) => {
                        return <button key={tag} onClick={() => handleSearch(tag)} className={`${tag === txt ? 'bg-amber-400' : ''}` + ' transition-color duration-300 ease inline-flex items-center px-2 sm:px-6 py-1 sm:py-3 rounded-lg border bg-white text-md sm:text-xl hover:bg-amber-400 focus:bg-amber-400'}>{tag}</button>
                    })
                }
            </div>
            <button className='px-2 sm:px-4 py-2'>
                <BiChevronRight size={30} onClick={moveRight} />
            </button>
        </div>
    )
}

export default ScrollButton