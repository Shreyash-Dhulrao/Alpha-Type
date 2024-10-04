import { Link } from 'react-router-dom'
import assets from '../../Assets'
import { useState , useEffect } from 'react';

const LeftAdComponent = (props) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentLinkIndex(currentIndex => currentIndex + 1);
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentLinkIndex]);

    const links = [
        { url: 'https://www.typing.academy/', imgSrc: assets.Typingacademy, alt: 'typingacademy' },
        { url: 'https://www.typing.com/', imgSrc: assets.Typing, alt: 'typing' },
        { url: 'https://www.typingclub.com/', imgSrc: assets.Typingclub, alt: 'typingclub' },
        { url: 'https://rapidtyping.com/', imgSrc: assets.Rapidtyping, alt: 'rapidtyping' }
    ];

    return (
        <div className="left-ad pt-20 p-2 flex-col gap-y-20 fixed inset-y-0 left-0 w-1/4 bg-zinc-100 dark:bg-zinc-800 lg:flex hidden">
            {/* Map over links and display based on current index */}
            {links.slice(0, currentLinkIndex + 1).map((link, index) => (
                <Link key={index} to={link.url} target='_blank'>
                    <img src={link.imgSrc} alt={link.alt} />
                </Link>
            ))}
        </div>
    );
};

export default LeftAdComponent;