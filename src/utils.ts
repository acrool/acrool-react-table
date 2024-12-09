import {TTableTitle, TBodyDataID, TBodyDataFieldKey, ITableBody, TTitleCol, TBodyDataField} from './types';
import {CSSProperties} from 'react';
import {objectKeys} from '@acrool/js-utils/object';


export const getTemplate = <D extends string>(titles: TTableTitle<D>, gap: string): CSSProperties => {
    const frs = objectKeys(titles)
        ?.filter(titleKey => titles[titleKey].isHidden !== true)
        ?.map(titleKey => {
            const row = titles[titleKey];

            if(typeof row.col === 'number'){
                return `${row.col}px`;
            }
            if(row.col === true){
                return 'minmax(0, 1fr)';
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
export const getColSpanStyles = (colSpan: number) => {
    return {
        '--grid-column-span': colSpan > 1 ? colSpan: undefined,
    } as CSSProperties;
};

/**
 * 產生合併欄位屬性
 * @param rowSpan
 */
export const getRowSpanStyles = (rowSpan: number) => {
    return {
        '--grid-row-span': rowSpan > 1 ? rowSpan: undefined,
        '--body-line-height': rowSpan > 1 ? 'auto': undefined,
    } as CSSProperties;
};




/**
 * 計算 sticky top
 * @param isSticky
 */
export const getCalcStickyTopStyles = (isSticky?: boolean) => {
    return {
        '--sticky-top': isSticky ? 0: undefined,
    } as CSSProperties;
};



/**
 * 計算 sticky left
 * @param calcLeft
 * @param sticky
 */
export const getCalcStickyLeftStyles = (calcLeft?: TTitleCol[], sticky?: 'left'|'right') => {

    const formatVal = calcLeft?.map(row => {
        if(typeof row === 'number'){
            return `${row}px`;
        }
        // 正則判斷必須是 px % em rem 才可以，否則回傳 undefined;
        if(typeof row === 'string' && /(\d+)(px|%|em|rem)/.test(row)){
            return row;
        }
        return undefined;
    }).filter(str => str) ?? [];

    return {
        '--sticky-left': sticky === 'left' ? `calc(${formatVal.join(' + ')})`: undefined,
        '--sticky-right': sticky === 'right' ? `calc(${formatVal.join(' + ')})`: undefined,
    } as CSSProperties;
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



interface ITableTitleData<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data: ITableBody<K, I>[]
}


/**
 * 綁定的方式產生 data,
 * tableTitleData({
 *     title: {text: 'title', col: 'auto'},
 *     name: {text: 'name', col: 'auto'},
 * }, [
 *     {
 *         id: 'name',
 *         field: {
 *             name: 'xx',
 *             title: 'xxx',
 *         }
 *     }
 * ]);
 * @param title
 * @param data
 */
export const genericsTitleData = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data: ITableBody<K, I>[]): ITableTitleData<K, I> => {
    return {title, data};
};

export {arrayMove} from '@dnd-kit/sortable';


