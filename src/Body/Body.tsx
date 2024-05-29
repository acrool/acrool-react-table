import React, {Fragment, useState, MouseEvent, CSSProperties, ReactNode} from 'react';
import {removeByIndex} from 'bear-jsutils/array';
import {isNotEmpty} from 'bear-jsutils/equal';
import {objectKeys} from 'bear-jsutils/object';

import {
    ITableBody,
    TBodyDataID,
    TTableTitle,
    TBodyDataFieldKey,
    TBodyDataField,
    TCollapseEvent, TTitleCol
} from '../types';
import {getCalcStickyLeft, getColSpan} from '../utils';
import clsx from "clsx";


interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
}


/**
 * Table Body
 */
const Body = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    title,
    data,
}: IProps<K, I>) => {

    const [collapseIds, setCollapse] = useState<I[]>([]);


    /**
     * 處理開關明細
     * @param id
     */
    const handleSetCollapse = (id: I): TCollapseEvent => {
        return (event?: MouseEvent) => {
            event?.stopPropagation();

            setCollapse(ids => {
                const index = ids.findIndex(rowId => rowId === id);
                if(index >= 0){
                    return removeByIndex(ids, index);
                }
                return [...ids, id];
            });
        };
    };


    /**
     * 渲染額外展開內容
     */
    const renderDetailData = (dataRow: ITableBody<K, I>) => {
        if(!!dataRow.detail === false){
            return null;
        }

        if(!collapseIds?.includes(dataRow.id)){
            return null;
        }

        if(dataRow?.detail && 'data' in dataRow.detail){
            const config = dataRow.detail.config;

            return dataRow.detail.data.map((detailFields, detailIndex) => {
                let colMergeAfterIgnoreLength = 0;

                const tds = objectKeys(title)
                    ?.reduce((curr: JSX.Element[], titleKey) => {
                        const titleRow = title[titleKey];


                        const fieldConfig = {
                            ...titleRow,
                            ...config?.[titleKey],
                        };
                        const fieldValue = detailFields[titleKey];
                        const colSpan = fieldConfig?.colSpan ?? 1;
                        const isHidden = fieldConfig.isHidden;

                        if(isHidden){
                            return curr;
                        }
                        if(colMergeAfterIgnoreLength > 0){
                            colMergeAfterIgnoreLength -= 1;
                            return curr;
                        }

                        if(colSpan > 1){
                            colMergeAfterIgnoreLength = colSpan - 1;
                        }

                        return [
                            ...curr,
                            <td
                                key={`tbodyDetailTd_${dataRow.id}_${detailIndex}_${titleKey}`}
                                data-detail=""
                                className={titleRow.className}
                                // aria-label={titleRow.text}
                                data-align={fieldConfig.dataAlign}
                                data-vertical={titleRow.dataVertical}
                                {...getColSpan(colSpan)}
                            >
                                {fieldValue}
                            </td>
                        ];
                    }, []);

                return <tr
                    key={`tbodyDetailTr_${dataRow.id}_${detailIndex}`}
                    data-collapse=""
                >
                    {tds}
                </tr>;
            });

        }

        return <tr data-collapse="">
            <td {...getColSpan(objectKeys(title).length)}>
                {dataRow.detail as ReactNode}
            </td>
        </tr>;
    };


    /**
     * 取得資料內容
     * @param field
     * @param isActive
     * @param collapse
     */
    const getBodyData = (field: TBodyDataField<K>[K], isActive: boolean, collapse: TCollapseEvent) => {
        if(typeof field === 'function'){
            return field({isActive, collapse});
        }

        if(typeof field === 'boolean'){
            return String(field);
        }

        if(typeof field === 'object' && field !== null && 'value' in field){
            return field.value;
        }

        return field as ReactNode;
    };


    /**
     * 取得欄位設定
     * @param titleField
     */
    const getConfig = (titleField: TBodyDataField<K>[K]) => {
        if(typeof titleField === 'object' &&
            (titleField !== null && 'value' in titleField)
        ){
            return titleField;
        }
        return undefined;
    };


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        return data?.map((dataRow, index) => {
            if(typeof dataRow?.id === 'undefined'){
                throw new Error('TableBody error, `dataRow.id` can\'t is undefined!');
            }

            const collapseEvent = handleSetCollapse(dataRow.id);

            // 避免忽略行，CSS無法跳過，所以自行計算
            let cellTdIndex = 0;

            // 忽略合併行數
            let colMergeAfterIgnoreLength = 0;

            // 計算沾黏的位置
            let calcLeft: TTitleCol[] = ['0px'];

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const titleField = dataRow.field[titleKey];
                    const config = getConfig(titleField);

                    const titleRow = title[titleKey];

                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };
                    const field = dataRow.field[titleKey];

                    if(colMergeAfterIgnoreLength > 0){
                        colMergeAfterIgnoreLength -= 1;
                        return curr;
                    }

                    const colSpan = fieldConfig?.colSpan ?? 1;
                    if(colSpan > 1){
                        colMergeAfterIgnoreLength = colSpan - 1;
                    }

                    // 上一個
                    const prevCol = title[titleKeys[idx - 1]]?.col;
                    const prevIsSticky = title[titleKeys[idx - 1]]?.isSticky;
                    if(prevIsSticky && idx > 0 && prevCol){
                        calcLeft.push(prevCol);
                    }



                    let nthType = undefined;
                    if(isNotEmpty(field)){
                        nthType = cellTdIndex % 2 === 0 ? 'odd': 'even';
                        cellTdIndex = cellTdIndex + 1;
                    }


                    const children = getBodyData(field, collapseIds.includes(dataRow.id), collapseEvent);


                    const {style: colSpanStyles} = getColSpan(colSpan);
                    const {style: stickyLeftStyles} = getCalcStickyLeft(calcLeft, titleRow.isSticky);
                    const args = {
                        key: `tbodyTd_${dataRow.id}_${titleKey}`,
                        className: nthType === 'even' ? 'even': undefined,
                        'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                        // 'data-nth-type': nthType,
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': titleRow.dataVertical,
                        'data-sticky': titleRow.isSticky ? '': undefined,
                        colSpan,
                        style: {
                            ...colSpanStyles,
                            ...stickyLeftStyles,
                        },
                        children,
                    };
                    return [
                        ...curr,
                        <td {...args}/>,
                    ];
                }, []);

            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <tr
                    onClick={(event) => {
                        if(dataRow.onClickRow) {
                            dataRow.onClickRow(() => collapseEvent(event));
                        }
                    }}
                    data-disabled={dataRow.disabled}
                    className={index % 2 === 0 ? undefined: 'even'}
                    // data-nth-type={index % 2 === 0 ? 'odd': 'even'}
                    role={dataRow.onClickRow ? 'button': undefined}
                >
                    {tds}
                </tr>


                {renderDetailData(dataRow)}

            </Fragment>);
        });
    };


    return <tbody>
        {renderBodyData()}
    </tbody>;
};

export default Body;
