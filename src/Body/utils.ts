import {
    ITableBody,
    TBodyDataDetail,
    TBodyDataField,
    TBodyDataFieldKey,
    TBodyDataID,
    TTableTitle,
    TTitleCol
} from '../types';
import {objectKeys} from '@acrool/js-utils/object';





/**
 * 取得欄位設定
 * @param titleField
 */
export const getBodyConfig = <K extends TBodyDataFieldKey>(titleField: TBodyDataField<K>[K]) => {
    if(typeof titleField === 'object' &&
        (titleField !== null && 'value' in titleField)
    ){
        return titleField;
    }
    return undefined;
};


/**
 * 取得欄位設定
 * @param titleField
 */
export const getBodyDetailConfig = <K extends TBodyDataFieldKey>(titleField?: JSX.Element | TBodyDataDetail<K>) => {
    if(typeof titleField === 'object' &&
        (titleField !== null && 'config' in titleField)
    ){
        return titleField;
    }
    return undefined;
};


/**
 * 取得 Colspan 設定
 * @param bodyField
 */
const getBodyColspanConfig = <K extends TBodyDataFieldKey>(bodyField?: TBodyDataField<K>[K]) => {
    if(typeof bodyField === 'object'){
        if('colSpan' in bodyField){
            return bodyField.colSpan ?? 1;
        }
    }
    return 1;
};


/**
 * 取得處理合併設定
 * @param title
 * @param data
 */
export const getBodyColSpanConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        let colMergeAfterIgnoreLength = 0;
        const titleKeys = objectKeys(title);
        return titleKeys
            ?.filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: Record<string, any>, titleKey, idx) => {
                const bodyField = dataRow.field[titleKey];
                const colSpan = getBodyColspanConfig(bodyField);

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
 * 取得沾黏的設定 (Left)
 * @param title
 * @param data
 */
export const getBodyStickyLeftConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        const calcLeft: TTitleCol[] = ['0px'];
        const titleKeys = objectKeys(title);
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
                    [titleKey]: [
                        ...calcLeft,
                    ]
                };
            }, {});
    });
};


/**
 * 取得沾黏的設定 (Right)
 * @param title
 * @param data
 */
export const getBodyStickyRightConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        const calcRight: TTitleCol[] = ['0px'];
        const titleKeys = objectKeys(title).reverse();
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
                    [titleKey]: [
                        ...calcRight,
                    ]
                };
            }, {});
    });
};
