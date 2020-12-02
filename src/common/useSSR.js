import { useState, useEffect } from 'react';

/**
 * check whether its server side rendering
 */
export const useSSR = ()=> {
    //by default it will be server side rendering;
    const [isSsr, setSsr] = useState(true);
    useEffect(()=>{
        //useEffect runs only if its client side rendering, so setting ssr to "false"
        setSsr(false);
    },[]);
    return isSsr;
}