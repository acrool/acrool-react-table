import {
    IConfig,
    ITableBody,
    TBodyDataField,
    TBodyDataFieldKey,
    TBodyDataID,
    TFooter,
    TTableTitle,
    TTitleCol
} from '../types';
import {objectKeys} from 'bear-jsutils/object';



const getBodyConfig = <K extends TBodyDataFieldKey>(bodyField?: TBodyDataField<K>[K]) => {
    if(typeof bodyField === 'object'){
        const setting: IConfig = {};
        if('colSpan' in bodyField){
            setting['colSpan'] = bodyField.colSpan;
        }
        if('dataAlign' in bodyField){
            setting['dataAlign'] = bodyField.dataAlign;
        }
        if('dataVertical' in bodyField){
            setting['dataVertical'] = bodyField.dataVertical;
        }
        return setting;
    }
    return undefined;
};


/**
 * 取得處理合併設定
 * @param title
 * @param data
 */
export const getColSpanConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {

    return data?.map((dataRow, index) => {
        // 忽略合併行數
        let colMergeAfterIgnoreLength = 0;
        const titleKeys = objectKeys(title);
        return titleKeys
            ?.filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: Record<string, any>, titleKey, idx) => {
                const bodyField = dataRow.field[titleKey];

                const bodyConfig = getBodyConfig(bodyField);
                const colSpan = bodyConfig?.colSpan ?? 1;


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
export const getStickyLeftConfig = <K extends TBodyDataFieldKey, I extends TBodyDataID>(title: TTableTitle<K>, data?: ITableBody<K, I>[]) => {

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
