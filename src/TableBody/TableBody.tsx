import React, {Fragment, CSSProperties, useState} from 'react';
import cx from 'classnames';
import {removeByIndex} from 'bear-jsutils/array';

import {IData, TDataFooterContent, ITitle} from '../types';
import {getColSpan} from '../utils';


interface IProps<T> {
    title: ITitle[],
    data?: IData<T>[],
}


/**
 * Table Body
 */
const TableBody = <T extends string|number>({
    title,
    data,
}: IProps<T>) => {

    const [collapseIds, setCollapse] = useState<T[]>([]);


    const handleSetCollapse = (id: T) => {
        setCollapse(ids => {
            const index = ids.findIndex(rowId => rowId === id);
            if(index >= 0){
                return removeByIndex(ids, index);
            }
            return [...ids, id];
        });
    };


    /**
     * 額外展開內容
     */
    const renderDetailData = (dataRow: IData<T>) => {
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

                const tds = title?.reduce((curr: JSX.Element[], titleRow) => {
                    const fieldConfig = {
                        ...titleRow,
                        ...config[titleRow.field],
                    };
                    const fieldValue = detailFields[titleRow.field];
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
                            key={`tbodyDetailTd_${dataRow.id}_${detailIndex}_${titleRow.field}`}
                            className={cx(titleRow.className)}
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
            <td {...getColSpan(title.length)}>
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

            return (<Fragment
                key={`tbodyTr_${dataRow.id}`}
            >
                <tr
                    onClick={dataRow.onClickRow}
                    data-disabled={dataRow.disabled}
                    data-nth-type={index % 2 === 0 ? 'odd': 'even'}
                    role={dataRow.onClickRow ? 'button':undefined}
                >
                    {/* 各欄位值 */}
                    {title?.map(titleRow => {
                        const field = dataRow.field[titleRow.field];
                        return (<td
                            key={`tbodyTd_${dataRow.id}_${titleRow.field}`}
                            className={titleRow.className}
                            data-align={titleRow.dataAlign}
                            data-vertical={titleRow.dataVertical}
                        >
                            {
                                typeof field === 'function' ?
                                    field({isActive: collapseIds.includes(dataRow.id), collapse: () => handleSetCollapse(dataRow.id)}):
                                    field
                            }
                        </td>);
                    })}
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
