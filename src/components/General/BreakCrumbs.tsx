import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import mockShortcuts, { ShortcutType } from '@/mockdata/MockShortcuts';

type TBreadCrumbProps = {
    homeElement: React.ReactNode,
    separator: React.ReactNode,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean,
    teamName?: string,
    memberName?: string,
}

const NextBreadcrumb = ({ homeElement, separator, listClasses, activeClasses, teamName, memberName }: TBreadCrumbProps) => {
    const pathname = usePathname();
    const [history, setHistory] = useState<{ url: string; alias: string }[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHistory(getLocalStorageHistory());
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && pathname) {
            if (isInternalShortcut(pathname)) {
                resetHistory(pathname);
            } else {
                updateHistory(pathname);
            }
        }
    }, [pathname, memberName, teamName]);

    const getLocalStorageHistory = (): { url: string; alias: string }[] => {
        if (typeof window !== 'undefined') {
            const storedHistory = localStorage.getItem('breadcrumbHistory');
            try {
                return storedHistory ? JSON.parse(storedHistory) as { url: string; alias: string }[] : [{ url: '/', alias: 'Home' }];
            } catch (error) {
                console.error('Failed to parse breadcrumb history from localStorage:', error);
            }
        }
        return [{ url: '/', alias: 'Home' }];
    };

    const setHistoryTo = (path: string) => {
        setHistory(prevHistory => {
            const pathIndex = prevHistory.findIndex(item => item.url === path);
            if (pathIndex !== -1) {
                const newHistory = prevHistory.slice(0, pathIndex + 1);
                localStorage.setItem('breadcrumbHistory', JSON.stringify(newHistory));
                return newHistory;
            }
            return prevHistory;
        });
    };

    const isInternalShortcut = (path: string): boolean => {
        return mockShortcuts
            .filter(shortcut => shortcut.type === ShortcutType.INTERNAL)
            .some(shortcut => shortcut.shortcuts.some(link => link.url === path));
    };

    const resetHistory = (path: string) => {
        const alias = path.includes('profile') ? memberName ?? 'Loading...' 
            : path.includes('team') && !path.includes('teams') ? teamName ?? 'Loading...' 
            : (path.split('/')[path.split('/').length - 1] ?? path).charAt(0).toUpperCase() 
            + (path.split('/')[path.split('/').length - 1] ?? path).slice(1);;
        
        if (alias === 'Loading...') {
            return
        }

        const newHistory = [{ url: '/', alias: 'Home' }, { url: path, alias: alias }];
        setHistory(newHistory);
        localStorage.setItem('breadcrumbHistory', JSON.stringify(newHistory));
    };

    const updateHistory = (path: string) => {
        const computeAlias = () => {
            if (path.includes('team') && !path.includes('teams')) {
                return teamName ?? 'Loading...';
            }

            if (path.includes('profile')) {
                return memberName ?? 'Loading...';
            }

            return capitalize(path.split('/').pop() ?? path)
        };

        const alias = computeAlias();

        if (alias === 'Loading...') {
            return
        }

        setHistory(prevHistory => {
            const pathIndex = prevHistory.findIndex(item => item.url === path);
            if (pathIndex === -1) {
                const newHistory = [...prevHistory, { url: path, alias }];
                localStorage.setItem('breadcrumbHistory', JSON.stringify(newHistory));
                return newHistory;
            } else {
                const newHistory = prevHistory.slice(0, pathIndex + 1);
                localStorage.setItem('breadcrumbHistory', JSON.stringify(newHistory));
                return newHistory;
            }
        });
    };

    const capitalize = (str: string): string => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleLinkClick = (path: string) => {
        setHistoryTo(path);
    };

    return (
        <div className='sticky top-0'>
            <ul className='hidden backdrop-blur-sm text-lg md:flex md:py-2 md:px-2 relative'>
                <li className='hover:underline mx-2 font-bold'>
                    <Link href={'/'} onClick={() => handleLinkClick('/')}>
                        {homeElement}
                    </Link>
                </li>
                {history.length > 0 && separator}
                {history.map((breadcrumb, index) => {
                    const { url, alias } = breadcrumb;
                    if (!url || index === 0) return null; // Ensure breadcrumb is valid
                    const itemClasses = pathname === url ? `${listClasses} ${activeClasses}` : listClasses;
                    const itemLink = alias;

                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={url} onClick={() => handleLinkClick(url)}>{itemLink}</Link>
                            </li>
                            {history.length !== index + 1 && separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default NextBreadcrumb;
