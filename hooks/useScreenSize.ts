import { useEffect, useState } from "react";

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    useEffect(() => {
        function handleResize() {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        }
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        screenSize
    }
}