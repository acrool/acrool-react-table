import {ITableBody, TBodyDataFieldKey, TBodyDataID, TTableTitle, TTitleCol} from '../types';
import {objectKeys} from '@acrool/js-utils/object';





/**
 * 取得處理合併設定
 * @param title
 */
export const getHeaderColSpanConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>) => {

    let colMergeAfterIgnoreLength = 0;
    const titleKeys = objectKeys(title);

    return titleKeys
        ?.filter(titleKey => !title[titleKey].isHidden)
        ?.reduce((curr: Record<string, any>, titleKey, idx) => {
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
 * 取得處理合併設定
 * @param title
 */
export const getHeaderRowSpanConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>) => {

    // let rowMergeAfterIgnoreLength = 0;
    const titleKeys = objectKeys(title);

    return titleKeys
        ?.filter(titleKey => !title[titleKey].isHidden)
        ?.reduce((curr: Record<string, any>, titleKey, idx) => {
            const fieldConfig = title[titleKey];
            const isRowSpan = fieldConfig?.isRowSpan ?? false;

            // 被合併忽略
            // if(rowMergeAfterIgnoreLength > 0){
            //     rowMergeAfterIgnoreLength -= 1;
            //     return curr;
            // }

            // 如果大於1, 下一個忽略
            // if(rowSpan > 1){
            //     rowMergeAfterIgnoreLength = rowSpan - 1;
            // }

            return {
                ...curr,
                [titleKey]: isRowSpan
            };

        }, {});
};


/**
 * 取得沾黏的設定
 * @param title
 * @param data
 */
export const getHeaderStickyLeftConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {
// 忽略合併行數
    const calcLeft: TTitleCol[] = ['0px'];

    const titleKeys = objectKeys(title);
    return titleKeys
        ?.filter(titleKey => !title[titleKey].isHidden)
        ?.reduce((curr: Record<string, any>, titleKey, idx) => {
            // 上一個
            const prevCol = title[titleKeys[idx - 1]]?.col;
            const prevIsSticky = title[titleKeys[idx - 1]]?.isSticky;

            if(prevIsSticky && idx > 0 && prevCol){
                calcLeft.push(prevCol);
            }

            return {
                ...curr,
                [titleKey]: [
                    ...calcLeft,
                ]
            };

        }, {});

};
