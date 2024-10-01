import assets from '../../Assets'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


const RightAdComponent = (props) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentLinkIndex(currentIndex => currentIndex + 1);
        }, 1500);

        // Clear timeout on unmount
        return () => clearTimeout(timer);
    }, [currentLinkIndex]);

    const links = [
        { url: 'https://10fastfingers.com/', imgSrc: assets.fastfiners, alt: 'fastfingers' },
        { url: 'https://www.keybr.com/', imgSrc: assets.keybr, alt: 'keybr' },
        { url: 'https://play.typeracer.com/', imgSrc: assets.typeracer, alt: 'typeracer' },
        { url: 'https://www.typingzone.com/', imgSrc: assets.typingzone, alt: 'typingzone' }
    ];

    return (
        <div className="left-ad pt-20 flex p-2 flex-col gap-y-20 fixed inset-y-0 right-0 w-1/4 bg-zinc-100 dark:bg-zinc-800 lg:flex hidden">
            {/* Map over links and display based on current index */}
            {links.slice(0, currentLinkIndex + 1).map((link, index) => (
                <Link key={index} to={link.url} target='_blank'>
                    <img src={link.imgSrc} alt={link.alt} />
                </Link>
            ))}
        </div>
    )
};

export default RightAdComponent