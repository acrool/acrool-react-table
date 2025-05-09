import {objectKeys} from '@acrool/js-utils/object';

import {ITableBody, TBodyDataFieldKey, TBodyDataID, TTableTitle, TTitleCol} from '../types';





/**
 * 取得處理合併設定
 * @param title
 */
export const getHeaderColSpanConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>) => {

    let colMergeAfterIgnoreLength = 0;
    const titleKeys = objectKeys(title);

    return titleKeys
        .filter(titleKey => !title[titleKey].isHidden)
        .reduce((curr: Record<string, any>, titleKey, idx) => {
            const fieldConfig = title[titleKey];
            const colSpan = fieldConfig?.colSpan ?? 1;

            // 被合併忽略
            if(colMergeAfterIgnoreLength > 0){
                colMergeAfterIgnoreLength -= 1;
                return curr;
            }

            // 如果大於1, 下一個忽略
            if(colSpan > 1){
                colMergeAfterIgnoreLength = colSpan - 1;
            }

            return {
                ...curr,
                [titleKey]: colSpan
            };

        }, {});
};


/**
 * 取得沾黏的設定 (Left)
 * @param title
 * @param data
 */
export const getHeaderStickyLeftConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>) => {
// 忽略合併行數
    const calcLeft: TTitleCol[] = ['0px'];

    const titleKeys = objectKeys(title);
    const stickyKeys = titleKeys.filter(titleKey => title[titleKey]?.sticky === 'left');
    const lastStickyKey = stickyKeys.at(stickyKeys.length - 1);


    return titleKeys
        .filter(titleKey => !title[titleKey].isHidden)
        .reduce((curr: Record<string, any>, titleKey, idx) => {
            // 上一個
            const prevCol = title[titleKeys[idx - 1]]?.col;
            const prevIsSticky = title[titleKeys[idx - 1]]?.sticky === 'left';

            if(prevIsSticky && idx > 0 && prevCol){
                calcLeft.push(prevCol);
            }

            return {
                ...curr,
                [titleKey]: {
                    widths: [
                        ...calcLeft,
                    ],
                    isFirst: lastStickyKey === titleKey
                }
            };

        }, {});

};

/**
 * 取得沾黏的設定 (Right)
 * @param title
 * @param data
 */
export const getHeaderStickyRightConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>) => {
// 忽略合併行數
    const calcRight: TTitleCol[] = ['0px'];

    const titleKeys = objectKeys(title).reverse();

    const stickyKeys = titleKeys.filter(titleKey => title[titleKey]?.sticky === 'right');
    const lastStickyKey = stickyKeys.at(stickyKeys.length - 1);

    return titleKeys
        .filter(titleKey => !title[titleKey].isHidden)
        .reduce((curr: Record<string, any>, titleKey, idx) => {
            // 上一個
            const prevCol = title[titleKeys[idx - 1]]?.col;
            const prevIsSticky = title[titleKeys[idx - 1]]?.sticky === 'right';

            if(prevIsSticky && idx > 0 && prevCol){
                calcRight.push(prevCol);
            }

            return {
                ...curr,
                [titleKey]: {
                    widths: [
                        ...calcRight,
                    ],
                    isFirst: lastStickyKey === titleKey
                }
            };

        }, {});

};

