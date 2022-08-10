import {TCol} from './types';

export const getCol = (col: TCol) => {
    if(col === true){
        return {flex: 1};
    }

    const width = typeof col === 'number' ? `${col}px`: col;

    return {
        width: width,
        flex: `0 0 ${width}`
    };
};