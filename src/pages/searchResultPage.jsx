import React from 'react'
import { Avatar, Input, Logo } from '../components/header/widgets'
import Details from '../components/details'

const SearchResultPage = () => {

    return (
        <div className='w-full relative '>
            <div className='sticky top-0 left-0 bg-white w-full z-20'>
                <div className=' text-black z-10 md:container mx-auto flex items-center justify-between px-4 h-16 sm:h-20 w-full'>
                    <Logo />
                    <div className='hidden sm:flex w-full items-center sm:ml-[40px]'>
                        <Input />
                    </div>
                    <Avatar />
                </div>
                <hr />
            </div>
            <Details />



        </div>
    )
}

export default SearchResultPage