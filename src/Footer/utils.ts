import {objectKeys} from '@acrool/js-utils/object';

import {TBodyDataField, TBodyDataFieldKey, TFooter, TTableTitle, TTitleCol} from '../types';




/**
 * 取得欄位設定
 * @param titleField
 */
export const getFooterConfig = <K extends TBodyDataFieldKey>(titleField: TFooter<K>[K]) => {
    if(typeof titleField === 'object' &&
        (titleField !== null && 'colSpan' in titleField)
    ){
        return titleField;
    }
    return undefined;
};


/**
 * 取得欄位設定
 * @param bodyField
 */
export const getFooterClassNameConfig = <K extends TBodyDataFieldKey>(bodyField: TBodyDataField<K>[K]) => {
    if(typeof bodyField === 'object'){
        if('className' in bodyField){
            return bodyField.className;
        }
    }
    return undefined;
};

/**
 * 取得 Colspan 設定
 * @param bodyField
 */
const _getFooterColSpanConfig = <K extends TBodyDataFieldKey>(bodyField?: TBodyDataField<K>[K]) => {
    if(typeof bodyField === 'object'){
        if('colSpan' in bodyField){
            return bodyField.colSpan ?? 1;
        }
    }
    return 1;
};

/**
 * 取得 Rowspan 設定
 * @param bodyField
 */
const _getFooterRowSpanConfig = <K extends TBodyDataFieldKey>(bodyField?: TBodyDataField<K>[K]) => {
    if(typeof bodyField === 'object'){
        if('rowSpan' in bodyField){
            return bodyField.rowSpan ?? 1;
        }
    }
    return 1;
};

/**
 * 取得處理合併設定
 * @param title
 * @param data
 */
export const getFooterColSpanConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>, data?: TFooter<K>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        let colMergeAfterIgnoreLength = 0;
        const titleKeys = objectKeys(title);
        return titleKeys
            ?.filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: Record<string, any>, titleKey, idx) => {
                const footerField = dataRow[titleKey];
                const colSpan = _getFooterColSpanConfig(footerField) ;

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
    });
};


/**
 * 取得處理合併設定
 * @param title
 * @param data
 */
export const getFooterRowSpanConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>, data?: TFooter<K>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        let rowMergeAfterIgnoreLength = 0;
        const titleKeys = objectKeys(title);
        return titleKeys
            ?.filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: Record<string, any>, titleKey, idx) => {
                const footerField = dataRow[titleKey];
                const rowSpan = _getFooterRowSpanConfig(footerField) ;

                // 被合併忽略
                if(rowMergeAfterIgnoreLength > 0){
                    rowMergeAfterIgnoreLength -= 1;
                    return curr;
                }

                // 如果大於1, 下一個忽略
                if(rowSpan > 1){
                    rowMergeAfterIgnoreLength = rowSpan - 1;
                }

                return {
                    ...curr,
                    [titleKey]: rowSpan
                };

            }, {});
    });
};


/**
 * 取得沾黏的設定
 * @param title
 * @param data
 */
export const getFooterStickyLeftConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>, data?: TFooter<K>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        const calcLeft: TTitleCol[] = ['0px'];
        const titleKeys = objectKeys(title);
        return titleKeys
            ?.filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: Record<string, any>, titleKey, idx) => {
                // 上一個
                const prevCol = title[titleKeys[idx - 1]]?.col;
                const prevIsSticky = title[titleKeys[idx - 1]]?.sticky;

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
    });
};
