import {objectKeys} from '@acrool/js-utils/object';
import {CSSProperties, Ref} from 'react';

import {ITableBody, TBodyDataField,TBodyDataFieldKey, TBodyDataID, TTableTitle, TTitleCol} from './types';


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
        // '--grid-template': frs,
        '--grid-gap': gap
    } as CSSProperties;
};

export const getCol = (col: TTitleCol) => {
    if(typeof col === 'number'){
        return {
            '--td-width': `${col}px`,
        };
    }

    return {
        '--td-width': col ?? undefined,
    };

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





/**
 * Assign the refs
 *
 * <textarea
 *     {...props}
 *     ref={node => {
 *         mainRef.current = node;
 *         if (typeof ref === 'function') {
 *             ref(node);
 *         } else if (ref) {
 *             ref.current = node;
 *         }
 *     }}
 *     className={clsx(styles.mainTextarea, props.className)}
 *     aria-multiline="false"
 *     aria-readonly="false"
 *     spellCheck="false"
 * />
 * @param forwardedRef
 * @param localRef
 */
export const setForwardedRef = <T>(
    forwardedRef: Ref<T>|undefined,
    localRef: React.MutableRefObject<T|null>
) => {
    return (node: T | null) => {
        localRef.current = node;
        if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as {current: T|null}).current = node as T|null;
            }
        }
    };
};
