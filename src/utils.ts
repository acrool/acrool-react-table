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



/**
 * 千分位格式化
 * @param val 原數值
 * @param isDecimal2 保留小數2位
 */
export function formatCurrency(val = 0, isDecimal2 = false): string {
    const dec = Math.floor(val);
    const parts = dec.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
