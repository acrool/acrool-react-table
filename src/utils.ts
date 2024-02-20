import {TTableTitle, TBodyDataID, TBodyDataFieldKey, ITableBody} from './types';
import {CSSProperties} from 'react';
import {objectKeys} from 'bear-jsutils/object';


export const getTemplate = <D extends string>(titles: TTableTitle<D>, gap: string): CSSProperties => {
    const frs = objectKeys(titles)
        ?.filter(titleKey => titles[titleKey].isHidden !== true)
        ?.map(titleKey => {
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

