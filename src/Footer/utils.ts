import {TBodyDataField, TBodyDataFieldKey, TFooter, TTableTitle, TTitleCol} from '../types';
import {objectKeys} from 'bear-jsutils/object';




/**
 * 取得欄位設定
 * @param titleField
 */
export const getConfig = <K extends TBodyDataFieldKey>(titleField: TFooter<K>[K]) => {
    if(typeof titleField === 'object' &&
        (titleField !== null && 'value' in titleField)
    ){
        return titleField;
    }
    return undefined;
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
                const config = getConfig(footerField);

                const colSpan = config?.colSpan ?? 1;


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
 * 取得沾黏的設定
 * @param title
 * @param data
 */
export const getStickyLeftConfig = <K extends TBodyDataFieldKey>(title: TTableTitle<K>, data?: TFooter<K>[]) => {

    return data?.map((dataRow, index) => {
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
    });
};
