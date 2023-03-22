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


/**
 * 計算分頁
 * @param totalItem
 * @param pageLimit
 */
export const calcPageInfo = (totalItem: number, pageLimit: number) => {
    let pageTotal = totalItem / pageLimit;
    const remainder = totalItem % pageLimit;
    if(remainder > 0){
        pageTotal += 1;
    }

    return pageTotal;
};
