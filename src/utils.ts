import {TTitleCol, ITitleField, TTitleField} from './types';
import {CSSProperties} from 'react';


export const getTemplate = <D extends string>(titles: TTitleField<D>, gap: string): CSSProperties => {
    const frs = Object.keys(titles).map(titleKey => {
        const row = titles[titleKey];

        if(typeof row.col === 'number'){
            return `${row.col}px`;
        }
        if(row.col === true){
            return '1fr';
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

