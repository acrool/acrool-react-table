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
    TCollapseEvent
} from '../types';
import {getColSpan} from '../utils';


interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
}


/**
 * Table Body
 */
const TableBody = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
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
                let ignore = 0;

                const tds = objectKeys(title)
                    ?.reduce((curr: JSX.Element[], titleKey) => {
                        const titleRow = title[titleKey];

                        const fieldConfig = {
                            ...titleRow,
                            ...config[titleKey],
                        };
                        const fieldValue = detailFields[titleKey];
                        const colSpan = fieldConfig?.colSpan ?? 1;

                        if(ignore > 0){
                            ignore -= 1;
                            return curr;
                        }

                        if(colSpan > 1){
                            ignore = colSpan - 1;
                        }

                        return [
                            ...curr,
                            <td
                                key={`tbodyDetailTd_${dataRow.id}_${detailIndex}_${titleKey}`}
                                className={titleRow.className}
                                // aria-label={titleRow.text}
                                data-align={fieldConfig?.dataAlign}
                                data-vertical={titleRow?.dataVertical}
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

            let ignore = 0;

            const tds = objectKeys(title)
                ?.reduce((curr: JSX.Element[], titleKey) => {
                    const titleField = dataRow.field[titleKey];
                    const config = getConfig(titleField);

                    const titleRow = title[titleKey];

                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };
                    const field = dataRow.field[titleKey];
                    const colSpan = fieldConfig?.colSpan ?? 1;

                    if(ignore > 0){
                        ignore -= 1;
                        return curr;
                    }

                    if(colSpan > 1){
                        ignore = colSpan - 1;
                    }


                    const isTh = cellTdIndex === 0;

                    let nthType = undefined;
                    if(isNotEmpty(field)){
                        nthType = cellTdIndex % 2 === 0 ? 'odd': 'even';
                        cellTdIndex = cellTdIndex + 1;
                    }


                    const children = getBodyData(field, collapseIds.includes(dataRow.id), collapseEvent);


                    const args = {
                        key: `tbodyTd_${dataRow.id}_${titleKey}`,
                        className: titleRow.className,
                        'ariaLabel': titleRow.text,
                        'data-nth-type': nthType,
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': titleRow?.dataVertical,
                        ...getColSpan(colSpan),
                        children,
                    };
                    return [
                        ...curr,
                        isTh ? <th {...args}/>: <td {...args}/>,
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
                    data-nth-type={index % 2 === 0 ? 'odd': 'even'}
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

export default TableBody;
