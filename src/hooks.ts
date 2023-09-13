import {useEffect} from 'react';
import {throttle} from 'throttle-debounce';


export const useWindowResizeEffect = (cb: () => void, deps: any[]) => {

    // default
    useEffect(cb, []);

    // for update
    useEffect(() => {
        window.addEventListener('resize', throttleFunc, false);

        return () => {
            window.removeEventListener('resize', throttleFunc, false);
        };
    }, deps);

    const throttleFunc = throttle(300, cb);

};
