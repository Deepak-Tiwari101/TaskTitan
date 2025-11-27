"use client"
import {Search} from 'lucide-react'

export const Searchbar = () => {
    return (
        <div className='border border-gray-300 rounded-lg lg:w-100 p-1 flex items-center justify-between
        hover:bg-gray-200 transition-colors duration-200'>
            <input type="text" className="w-full border-none outline-none hidden md:block p-1" placeholder="Search"/>
            <Search className="w-6 h-6 p-1" width={30}/>
        </div>
    )
}