import { Icon } from "@iconify/react";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar bg-gray-800 text-white fixed w-full z-10 top-0">
            <div className="container mx-auto px-4 py-2 flex justify-content items-center">
                <Link href="/home" className="flex items-center mr-2">
                    <Icon icon="fontisto:holiday-village" width="36" height="24" />
                    <span className="ml-2 text-xl font-bold">Holiday Calendar</span>
                </Link>
                
                <Link href="/calendar" className="ml-2 flex items-center">
                    <Icon icon="line-md:calendar" width="24" height="24" /> Calendar
                </Link>
                <div className="flex items-center">
                    
                </div>
            </div>
        </nav>
    )
}