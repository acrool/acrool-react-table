import React, {Fragment, useState, MouseEvent, CSSProperties} from 'react';
import cx from 'classnames';
import {removeByIndex} from 'bear-jsutils/array';
import {isNotEmpty} from 'bear-jsutils/equal';

import {ITableBody, TBodyDataID, TTableTitle, TBodyDataFieldKey, TLineHeight} from '../types';
import {getColSpan} from '../utils';


interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
    lineHeight?: TLineHeight
}


/**
 * Table Body
 */
const TableBody = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    title,
    data,
    lineHeight,
}: IProps<K, I>) => {

    const [collapseIds, setCollapse] = useState<I[]>([]);


    /**
     * 處理開關明細
     * @param id
     */
    const handleSetCollapse = (id: I) => {
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

        if('data' in dataRow.detail){
            const config = dataRow.detail.config;

            return dataRow.detail.data.map((detailFields, detailIndex) => {
                let ignore = 0;

                const tds = Object.keys(title)?.reduce((curr: JSX.Element[], titleKey) => {
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
                            className={cx(titleRow.className)}
                            // aria-label={titleRow.text}
                            data-align={fieldConfig?.dataAlign}
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
            <td {...getColSpan(Object.keys(title).length)}>
                {dataRow.detail}
            </td>
        </tr>;
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
            let cellTdIndex = 0;

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
                    role={dataRow.onClickRow ? 'button':undefined}
                >
                    {/* 各欄位值 */}
                    {Object.keys(title)?.map(titleKey => {
                        const titleRow = title[titleKey];
                        const field = dataRow.field[titleKey];


                        let nthType = undefined;
                        if(isNotEmpty(field)){
                            nthType = cellTdIndex % 2 === 0 ? 'odd': 'even';
                            cellTdIndex = cellTdIndex + 1;
                        }

                        return (<td
                            key={`tbodyTd_${dataRow.id}_${titleKey}`}
                            className={titleRow.className}
                            aria-label={titleRow.text}
                            data-nth-type={nthType}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                        >
                            {
                                typeof field === 'function' ?
                                    field({isActive: collapseIds.includes(dataRow.id), collapse: collapseEvent}):
                                    field
                            }
                        </td>);
                    })}
                </tr>


                {renderDetailData(dataRow)}

            </Fragment>);
        });
    };


    return <tbody
        style={{
            '--body-line-height': lineHeight,
        } as CSSProperties}
    >
        {renderBodyData()}
    </tbody>;
};

export default TableBody;
