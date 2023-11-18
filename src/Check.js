import React, { useEffect } from 'react'
import {getTimer} from './handleData';

export default function Check() {
    useEffect(() => {
        const intervalId = setInterval(() => {
            getTimer();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
    <div>
    </div>
  )
}
