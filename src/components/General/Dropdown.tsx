import { useEffect, useRef, useState } from 'react';
import type { ShortcutLink } from '@/interfaces/ShortcutLink';
import { useSession } from 'next-auth/react';
import Icons from './Icons';

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to run this effect only once


    return (
        <div className="ml-10 relative group" ref={dropdownRef}>
            <button onClick={toggleDropdown}>
                {isOpen ?
                    <Icons name="Cross" /> : <Icons name="Dropdown" />
                }
            </button>
            {/* Dropdown content */}
            <div className={`absolute right-0 mt-4 w-48 rounded-2xl shadow-black shadow-2xl backdrop-blur-2xl ${isOpen ? 'block' : 'hidden'}`}>
                {shortcuts.map((shortcut, index) => (
                    <a
                        key={index}
                        href={shortcut.url}
                        className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${index === 0 ? 'rounded-t-2xl' : ''}`}
                    >
                        <h3>{shortcut.header}</h3>
                    </a>
                ))}

                {session ? (
                    <button key={"logOut"} onClick={handleLogout} className="rounded-b-2xl w-full items-left block px-4 py-2 text-sm hover:bg-red-500 hover:text-white">
                        <h3 className="font-semibold">{"Log out"}</h3>
                    </button>
                ) : (
                    <button key={"logOut"} onClick={handleLogin} className="rounded-b-2xl w-full items-left block px-4 py-2 text-sm hover:bg-green-500 hover:text-white">
                        <h3 className="font-semibold">{"Log out"}</h3>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
