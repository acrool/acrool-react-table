import {TCol, ITitle} from './types';
import {CSSProperties} from 'react';




export const getTemplate = (titles: ITitle[], gap: string): CSSProperties => {
    const frs = titles.map(row => {
        if(typeof row.col === 'number'){
            return `${row.col}px`;
        }
        return row.col ?? 'auto';
    }).join(' ');


    return {
        '--grid-template': frs,
        '--grid-gap': gap
    } as CSSProperties;
};


/**
 * 產生合併欄位屬性
 * @param colSpan
 */
export const getColSpan = (colSpan: number) => {
    return {
        colSpan,
        style: {
            '--grid-column-span': colSpan,
        } as CSSProperties
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
    if (remainder > 0) {
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
