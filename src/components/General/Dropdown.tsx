import { useEffect, useRef, useState } from 'react';
import type { ShortcutLink } from '@/interfaces/ShortcutLink';
import { useSession } from 'next-auth/react';

interface DropdownProps {
    shortcuts: ShortcutLink[];
    handleLogout: () => void;
    handleLogin: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ shortcuts, handleLogout, handleLogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const session = useSession();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to run this effect only once


    return (
        <div className="ml-10 relative group" ref={dropdownRef}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleDropdown}
            >
                {isOpen ? (
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
            </svg>
            {/* Dropdown content */}
            <div className={`absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                {shortcuts.map((shortcut, index) => (
                    <a key={index} href={shortcut.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                        <div className="font-semibold">{shortcut.header}</div>
                        <div className="text-xs text-gray-500">{shortcut.description}</div>
                    </a>
                ))}

                {session ? (
                    <a key={"logOut"} onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white">
                        <div className="font-semibold">{"Log out"}</div>
                    </a>
                ) : <a key={"logOut"} onClick={handleLogin} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">
                    <div className="font-semibold">{"Log out"}</div>
                </a>
                }
            </div>
        </div>
    );
};

export default Dropdown;
